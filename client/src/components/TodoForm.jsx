import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import Todo from "./Todo";
import axios from "axios";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [taskid, setTaskid] = useState("");
  const [todos, setTodos] = useState([]);
  const [valid , setValid] = useState(false);

  const onFormSubmit = (e) => {
    // add todo api
    e.preventDefault();

   
    axios
      .post("http://localhost:8000/api/v1/create", temp, config)
      .then((res) => {console.log(res)}
      
      )
      .catch((err) => console.log(err));
  };

  // console.log(text);
  return (
    <>
      <Header />
      <form className="form" method="post">
        <input
          type="text"
          placeholder="Enter the name..."
          className="input"
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the task id..."
          className="input"
          onChange={(e) => setTaskid(e.target.value)}
        />

        <button className="btn" type="submit" onClick={onFormSubmit}>
          submit
        </button>

        <Todo />
      </form>
    </>
  );
};

export default TodoForm;
