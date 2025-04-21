import { Link } from "react-router-dom/cjs/react-router-dom.min";

const HomePage = () => {
  return (
    <div className="main-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center" }}>
      
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Welcome to TO-DO!!
      </h1>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Are you ready to complete the tasks?
      </h1>

      <Link to="/home">
        <button style={{ padding: "10px 20px", fontSize: "18px", backgroundColor: "#6b2869", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)" }}>
          Enter
        </button>
      </Link>

    </div>
  );
};

export default HomePage;
