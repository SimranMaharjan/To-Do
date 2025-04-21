import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../NavBar";
import axios from "axios";
import AuthorityCheckBoolean from "../../middleware/AuthorityCheckBoolean";

const ViewPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetchTodo();
  }, [id]); 

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/todos/${id}`);
      setTodo(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      history.replace("/"); // Redirect to home page after deletion
    } catch (error) {
      console.error("Error deleting todo:", error.response || error);
    }
  };

  const tableHeaderStyle = {
    padding: "12px",
    borderBottom: "2px solid white",
  };
  
  const tableCellStyle = {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    textAlign: "center",
  };

  // return (
  //   <>
  //     <NavBar />
  //     <div className="main-container" style={{ display: "flex", flexDirection: "column", height: "100vh", textAlign: "center" }}>
  //       <div style={{ background: "#e7e7e7", padding: "10px", margin: "10px", fontSize: "20px" }}>
  //         {todo ? `${todo.task} (Due: ${todo.due_date})` : "Loading..."}
  //       </div>
  //       <button onClick={() => history.push("/home")} style={{ cursor: "pointer", backgroundColor:"#6b2869" }}>Go Back</button>
  //       {AuthorityCheckBoolean() && <button style={{ background: "#be0606" }} onClick={deleteTodo}>Delete Todo</button>}
  //     </div>
  //   </>
  // );

  return (
    <>
      <NavBar />
      <div 
        className="main-container" 
        style={{ display: "flex", flexDirection: "column", height: "100vh", textAlign: "center", alignItems: "center", justifyContent: "center" }}
      >
        {todo ? (
          <table style={{ borderCollapse: "collapse", width: "60%", margin: "20px auto", background: "#e7e7e7", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
            <thead>
              <tr style={{ backgroundColor: "#6b2869", color: "white", fontSize: "18px" }}>
                <th style={tableHeaderStyle}>Task</th>
                <th style={tableHeaderStyle}>Due Date</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tableCellStyle}>{todo.task}</td>
                <td style={tableCellStyle}>{todo.due_date || "No Due Date"}</td>
                <td style={tableCellStyle}>
                  {todo.completed ? "Completed ✅" : "Pending ⏳"}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
  
        <button 
          onClick={() => history.push("/home")} 
          style={{ cursor: "pointer", backgroundColor:"#6b2869", color: "white", padding: "10px 20px", margin: "10px", borderRadius: "5px" }}
        >
          Go Back
        </button>
  
        {AuthorityCheckBoolean() && (
          <button 
            style={{ background: "#be0606", color: "white", padding: "10px 20px", margin: "10px", borderRadius: "5px" }} 
            onClick={deleteTodo}
          >
            Delete Todo
          </button>
        )}
      </div>
    </>
  );
  
  // Table styles

  
};

export default ViewPage;
