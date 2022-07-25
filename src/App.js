import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Note from "./components/Note";
import Notification from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("Type a note");
  const [toggle, setToggle] = useState(true);
  const [message, setMessage] = useState(null);
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
      id: notes.length + 1,
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
      <Notification message="this is a important message" />
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
      <Footer />{" "}
    </div>
  );
};

export default App;
