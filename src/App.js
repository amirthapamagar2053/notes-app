import { useState, useEffect } from "react";
import Note from "./components/Note";
import Footer from "./components/Footer";
import noteService from "./services/notesservices";
import Notification from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [addNewNote, setaddNote] = useState("");
  const [showAll, setshowAll] = useState(true);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    // axios.get("http://localhost:3001/notes")
    noteService.getAll().then((data) => setNotes(data));
    console.log(notes);
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const newNote = {
      // id: notes.length + 1,
      content: addNewNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5 ? true : false,
    };
    // axios.post("http://localhost:3001/notes", newNote)
    noteService.create(newNote).then((data) => {
      // console.log(newNote);
      setNotes([...notes, data]);
      setaddNote("");
    });
  };

  const handleOnChange = (event) => {
    setaddNote(event.target.value);
    // console.log(event.target.value);
  };

  const togglebutton = () => {
    setshowAll(!showAll);
  };
  const notesToShow = showAll
    ? notes
    : notes.filter((x) => x.important === true);

  return (
    <div>
      <Notification msg={msg} />
      <h1>Notes</h1>
      <button onClick={togglebutton}>
        Show {showAll ? "important" : "all"}
      </button>
      <ol>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => {
              // console.log(`button clicked from ${note.id}`);
              const updatedNotes = { ...note, important: !note.important };
              // axios.put(`http://localhost:3001/notes/${note.id}`, updatedNotes)

              noteService
                .update(note.id, updatedNotes)
                .then((data) => {
                  setNotes(notes.map((x) => (x.id === note.id ? data : x)));
                  setaddNote("");
                })
                .catch((error) => {
                  setMsg("The note has been deleted");
                  setTimeout(() => setMsg(""), 3000);
                  setNotes(notes.filter((x) => x.id !== note.id));
                });
            }}
          />
        ))}
      </ol>
      <form onSubmit={addNote}>
        <input
          value={addNewNote}
          onChange={handleOnChange}
          placeholder="Enter Your Note"
        />
        <button type="submit"> Save </button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
