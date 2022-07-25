<<<<<<< HEAD
import axios from "axios";
import { useState, useEffect } from "react";
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
=======
import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteServices from "./services/notesservices";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
>>>>>>> 598613ae50e7f43e906c5d0dd097dc08fbe23c46
  const [note, setNote] = useState("Type a note");
  const [toggle, setToggle] = useState(true);
  console.log(notes);
  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((response) => setNotes(response.data));
    console.log("axios called", notes);
  }, [toggle]);

  const handleChange = (event) => {
    event.preventDefault();
    console.dir(event);
    const newObj = {
<<<<<<< HEAD
      id: notes.length + 1,
=======
      // id: notes.length + 1,
>>>>>>> 598613ae50e7f43e906c5d0dd097dc08fbe23c46
      content: note,
      Date: new Date().toISOString(),
      important: Math.random() > 0.5 ? true : false,
    };
    noteServices.create(newObj).then((response) => {
      setNotes([...notes, response]);
    });
    setNote("");
  };

  useEffect(() => {
    noteServices.getAll().then((response) => setNotes(response));
  }, []);

  const changeNote = (event) => {
    setNote(event.target.value);
  };

  const changeToggle = () => {
    setToggle(!toggle);
  };

  const usingFilter = () => {
    return notes.filter((Element) => Element.important === true);
  };
  const notesToShow = toggle ? notes : usingFilter();

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={changeToggle}>
        Show {toggle ? "all" : "important"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            content={note.content}
            important={note.important.toString()}
            toggleimportance={() => {
              const updateImportant = { ...note, important: !note.important };
              noteServices
                .update(note.id, updateImportant)
                .then((response) => {
                  setNotes(notes.map((x) => (x.id !== note.id ? x : response)));
                  setNote("");
                })
                .catch((error) => {
                  window.alert("the note has been deleted");
                  setNotes(notes.filter((x) => x.id !== note.id));
                });
            }}
          />
        ))}
      </ul>
      <form onSubmit={handleChange}>
        <input value={note} onChange={changeNote} />
        <button>CLick me for submit</button>
      </form>
    </div>
  );
};

export default App;
