import React, { useEffect, useState } from 'react';
import axios from "axios";
import './Todostyles.css'; 

const TodoList = () => {
  const [data, setData] = useState([]);
  const [postdata, setPostData] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [patchdata, setPatchData] = useState(null);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/tasks/");
      setData(response.data.tasks);
    } catch (err) {
      setError(err.message);
    }
  };

  const postData = async () => {
    try {
      const options = { name: newTask, complete: false };
      const res = await axios.post("http://localhost:5000/api/v1/tasks/", options);
//       setPostData(res.data);
      setNewTask(""); 
      fetchData(); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`);
//       setResponseMessage(res.data.message);
      fetchData(); 
    } catch (err) {
      setError(err.message);
    }
  };


  const handleUpdate = async (id) => {
    try {
      const updateOptions = { name: editTaskName };
      const res = await axios.patch(`http://localhost:5000/api/v1/tasks/${id}`, updateOptions);
//       setPatchData(res.data);
      setEditTask(null); 
      fetchData(); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1 className="header">To-Do List</h1>
      <div className="new-task">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={postData} className="add-btn">Add Task</button>
      </div>
      <div className="task-list">
        {data.map((item) => (
          <div key={item._id} className="task-item">
            {editTask === item._id ? (
              <>
                <input
                  type="text"
                  value={editTaskName} className='updateInput'
                  onChange={(e) => setEditTaskName(e.target.value)}
                />
                <button onClick={() => handleUpdate(item._id)} className="update-btn">
                  Update
                </button>
                <button onClick={() => setEditTask(null)} className="cancel-btn">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className={item.complete ? "completed" : ""}>{item.name}</p>
                <button onClick={() => setEditTask(item._id) || setEditTaskName(item.name)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="delete-btn">
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TodoList;
