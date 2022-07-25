const Note = (props) => {
  return (
    <li>
      {props.content} ({props.important}){" "}
      <button onClick={props.toggleimportance}>Change important</button>
    </li>
  );
};

export default Note;
