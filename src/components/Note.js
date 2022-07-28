const Note = ({ note, toggleImportance }) => {
  // let arr = [];
  // arr.push(note.content);
  // console.log(arr);
  // return <li>{arr.sort((a, b) => a.length - b.lenght)}</li>;
  return (
    <div>
      <li style={{ color: "royalblue" }}>
        {note.content} ({note.important.toString()})
      </li>
      <button onClick={toggleImportance}> Change Importance </button>
    </div>
  );
};

export default Note;
