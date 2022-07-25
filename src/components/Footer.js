const Footer = () => {
  let footerObj = {
    color: "red",
  };

  const changeColor = () => {
    if (window.confirm("Change color ?")) {
      //   footerObj = { ...footerObj, color: "green" };
      footerObj.color = "green";
    }
  };

  return (
    <div style={footerObj} onClick={changeColor}>
      <br />
      <em>Notes app,Tej Fellow</em>
    </div>
  );
};
export default Footer;
