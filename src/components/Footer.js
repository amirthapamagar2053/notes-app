import { useState } from "react";
const Footer = () => {
  const [footerObj, setFooter] = useState({ color: "red" });

  const changeColor = () => {
    if (window.confirm("Change color ?")) {
      setFooter({ ...footerObj, color: "green" });
      //   footerObj.color = "green";
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
