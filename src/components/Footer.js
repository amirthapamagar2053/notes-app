const Footer = () => {
  let footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
    backgroundColor: "teal",
  };

  if (true) {
    footerStyle = { ...footerStyle, color: "red" };
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Hello , TaTa ,ByeBye @Anthony 2022</em>
    </div>
  );
};

export default Footer;
