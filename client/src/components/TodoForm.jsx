import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import Todo from "./Todo";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [sub, setSub] = useState(false);

  const nav = useNavigate();

  useEffect(() => {

    // get all task api
    axios
      .get("/api/v1/getalltasks")
      .then((res) => {
        console.log(res.data.task[0].tasks);
        setTodos(res.data.task[0].tasks);
      })
      .catch((error) => {
        const err = error.response.data.msg;
        if(err){
          alert("please login or register");
          nav("/login");
        }
      });
  }, [sub]);

  const onFormSubmit = (e) => {

    // add todo api
    e.preventDefault();
    const taskid = uuidv4();

    const temp = { task, taskid };
    axios
      .post("/api/v1/create", temp)
      .then((res) => {
        console.log(res);
        setSub(true);
      })
      .catch((error) => {
        const err = error.response.data.msg;
        if (err) {
          alert("please login or register");
          nav("/login");
        }
      });

    setSub(false);
    setTask("");
  };

  return (
    <>
      <Header />
      <form name="myform" className="form" method="post">
        <input
          type="text"
          placeholder="Enter the name..."
          className="input"
          value={task}
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
