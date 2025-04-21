import NavBar from "../NavBar";

const NotFound = () => {
  return (
    <>
      <NavBar />
      <div className="main-container">
      <center style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>404. Page not found!</center>
      </div>
    </>
  );
};

export default NotFound;
