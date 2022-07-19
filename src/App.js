import { useState } from "react";
import Note from "./components/Note";
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [note, setNote] = useState("Type a note");
  const [toggle, setToggle] = useState(true);

  const handleChange = (event) => {
    event.preventDefault();
    console.dir(event);
    const newObj = {
      id: notes.length + 1,
      content: note,
      Date: new Date().toISOString(),
      important: Math.random() > 0.5 ? true : false,
    };
    setNotes([...notes, newObj]);
    setNote("");
  };

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
          <Note key={note.id} content={note.content} />
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
