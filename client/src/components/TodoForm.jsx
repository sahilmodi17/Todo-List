import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import Todo from "./Todo";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const TodoForm = () => {
  const [task, setTask] = useState("");
  // const [taskid, setTaskid] = useState("");
  const [todos, setTodos] = useState([]);
  const [sub, setSub] = useState(false);

  useEffect(() => {
    axios
      .get("/api/v1/getalltasks")
      .then((res) => {
        console.log(res.data.task[0].tasks);
        setTodos(res.data.task[0].tasks);
        // console.log(todos)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sub]);

  const onFormSubmit = (e) => {
    // add todo api
    e.preventDefault();
    // console.log(task + " " + taskid);
    const taskid = uuidv4();

    const temp = { task, taskid };
    axios
      .post("/api/v1/create", temp)
      .then((res) => {
        console.log(res);
        setSub(true);
      })
      .catch((err) => console.log(err));

    setSub(false);
    // reset();
  };

  // console.log(text);
  return (
    <>
      <Header />
      <form name="myform" className="form" method="post">
        <input
          type="text"
          placeholder="Enter the name..."
          className="input"
          onChange={(e) => setTask(e.target.value)}
        />
        <div className="w-[100%]  flex justify-center">
          <button className=" bg-gray-500 hover:bg-gray-700 mt-2 mb-4 text-white font-bold py-2 px-4 border border-gray-800 rounded w-[50%]" onClick={onFormSubmit}>
            Submit
          </button>
        </div>
        {todos.map((todo, i) => {
          return <Todo key={i} todo={todo} />;
        })}
      </form>
    </>
  );
};

export default TodoForm;
