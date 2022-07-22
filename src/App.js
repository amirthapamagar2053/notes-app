import { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [note, setNote] = useState("Type a note");
  const [toggle, setToggle] = useState(true);

  const handleChange = (event) => {
    event.preventDefault();
    console.dir(event);
    const newObj = {
      // id: notes.length + 1,
      content: note,
      Date: new Date().toISOString(),
      important: Math.random() > 0.5 ? true : false,
    };
    axios.post("http://localhost:3001/notes", newObj).then((response) => {
      console.log(response);
      setNotes([...notes, response.data]);
    });
    setNote("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((response) => setNotes(response.data));
    console.log("axios called", notes);
  }, [toggle]);

  const changeNote = (event) => {
    setNote(event.target.value);
  };

  const changeToggle = () => {
    setToggle(!toggle);
  };

  const usingFilter = () => {
    let arr = notes.filter((Element) => Element.important === true);
    return arr;
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
              axios
                .put(`http://localhost:3001/notes/${note.id}`, updateImportant)
                .then((response) => {
                  setNotes(
                    notes.map((x) => (x.id !== note.id ? x : response.data))
                  );
                  setNote("");
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
