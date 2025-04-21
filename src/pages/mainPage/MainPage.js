import { FaPlus, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar";
import Calendar from "./Calendar";
import { useState, useEffect } from "react";
import axios from "axios";
import cloud  from "../../assets/cloud.jpg";
import girl  from "../../assets/girl.jpg";
import sky  from "../../assets/sky.jpg";

const MainPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="main-container">
      <NavBar />
      <div className="grid-layout">
        <img src={cloud} alt="Cloud" className="cloud" />
        <Calendar/>
      <div className="quote">The Future Depends On What You Do Today</div>
      <img src={girl} alt="Girl" className="girl" />
      <div className="to-do">
  {todos.length > 0 ? (
    <ul className="todo-list">
      <div style={{display: "flex", alignItems:"center", justifyContent: "space-between", marginLeft:"200px"}}>
      <h2 >To Do List:</h2>
      <Link to="/add" style={{color:"white", justifyContent:"right"}}>
           <FaPlus  size={"25px"}/>
      </Link>
      </div>
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <div className="todo-content">
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleComplete(todo.id, todo.completed)} 
              className="todo-checkbox"
            />
            <span className={`todo-task ${todo.completed ? "completed" : ""}`}>
              {todo.task}
            </span>
            {/* {todo.due_date && <span className="todo-date">Due: {todo.due_date}</span>} */}
          </div>
          <Link to={`/view/${todo.id}`} className="todo-view">
            <FaRegEye size={"20px"} />
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <div style={{display: "flex", alignItems:"center", justifyContent: "space-betwwen",gap:"30px", marginLeft:"200px"}}>
      <h2 >Please add you To-Do!</h2>
      <Link to="/add" style={{color:"white", justifyContent:"right"}}>
           <FaPlus  size={"25px"}/>
      </Link>
      </div>
//     <p>To Do List Is Empty. Please <Link to="/add" style={{color:"white", justifyContent:"right"}}>
//     <FaPlus  size={"25px"}/>
// </Link></p>
  )}
 
</div>

      <img src={sky} alt="Sky" className="sky" />

    </div>
    </div>
  );
};

export default MainPage;
