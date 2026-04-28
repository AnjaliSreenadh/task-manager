import React, { useEffect, useState } from "react";
import axios from "axios";

// ❌ No BASE_URL needed anymore
// const BASE_URL = "http://localhost:8000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all tasks
  const fetchTasks = () => {
    axios.get("/api/")
      .then(res => setTasks(res.data))
      .catch(err => console.log("Fetch Error:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = () => {
    if (!title.trim()) return;

    axios.post("/api/add/", { title })
      .then(() => {
        setTitle("");
        fetchTasks();
      })
      .catch(err => console.log("Add Error:", err));
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`/api/delete/${id}/`)
      .then(() => fetchTasks())
      .catch(err => console.log("Delete Error:", err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;