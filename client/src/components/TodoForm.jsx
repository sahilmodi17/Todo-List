import React, { useEffect } from "react";
import { useState } from "react";
import Todo from "./Todo";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/Context";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const { todos, setTodos, edit, tid, setEdit } = useUserContext();
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
        if (err) {
          alert("please login or register");
          nav("/login");
        }
      });
  }, [sub]);

  const onAddSubmit = (e) => {
    // add todo api
    e.preventDefault();
    const taskid = uuidv4();
    const temp = { task, taskid };

    axios
      .post("/api/v1/create", temp)
      .then((res) => {
        console.log(res);
        alert("task added successfully");
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

  const onUpdateSubmit = (e) => {
    // update task api
    e.preventDefault();
    const temp = { task };
    axios
      .patch(`/api/v1/update/${tid}`, temp)
      .then((res) => {
        setSub(true);
        alert("Task updated successfully");
      })
      .catch((error) => console.log(error));
    setTask("");
    setSub(false);
    setEdit(false);
  };

  return (
    <>
      <header>
        <h2>Todo List</h2>
      </header>
      <form name="myform" className="form" method="post">
        <div className="flex mb-5">
          <input
            id="input1"
            type="text"
            placeholder="Enter the task name..."
            className="input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <div className="">
            {edit ? (
              <button
                className=" bg-gray-500 hover:bg-gray-700 ml-3 text-white font-bold py-2 px-4 border border-gray-800 rounded "
                onClick={onUpdateSubmit}
              >
                Update
              </button>
            ) : (
              <button
                className=" bg-gray-500 hover:bg-gray-700 ml-3 text-white font-bold py-2 px-4 border border-gray-800 rounded "
                onClick={onAddSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
        {todos.map((todo, i) => {
          return <Todo key={i} todo={todo} props={"input1"} />;
        })}
      </form>
    </>
  );
};

export default TodoForm;
