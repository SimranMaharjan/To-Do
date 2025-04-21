import { useState } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthorityCheck from "../../middleware/AuthorityCheck";

const AddTodo = () => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const history = useHistory();

  AuthorityCheck();

  const addToDo = async (e) => {
    e.preventDefault();
    if (!task) return alert("Please enter a task!");

    try {
      await axios.post("http://localhost:5000/todos", { task, due_date: dueDate });
      history.push("/");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="main-container" style={{ display: "flex", flexDirection: "column", height: "100vh", textAlign: "center" }}>
        <h1>Add Todo:</h1>
        <form onSubmit={addToDo}>
          <input type="text" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <button type="submit" style={{ cursor: "pointer", backgroundColor:"#6b2869" }}>Save To-Do</button>
        </form>
      </div>
    </>
  );
};

export default AddTodo;
