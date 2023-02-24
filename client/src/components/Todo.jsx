import { MdDelete } from "react-icons/Md";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

const Todo = ({ todo, props }) => {
  const [sub, setSub] = useState(false);
  const { setTodos } = useUserContext();
  const { setEdit } = useUserContext();
  const nav = useNavigate();
  const {  setTid } = useUserContext();

  useEffect(() => {
    axios
      .get("/api/v1/getalltasks")
      .then((res) => {
        setTodos(res.data.task[0].tasks);
      })
      .catch((error) => {
        console.log(error);
        if (err) {
          alert("please login or register");
          nav("/login");
        }
      });
  }, [sub]);

  const onEdit = () => {
    console.log("edit");
    setEdit(true);
    document.getElementById(props).focus();
    setTid(todo.taskid);
  };

  const onDelete = () => {
    // delete task api
    axios
      .delete(`/api/v1/delete/${todo.taskid}`)
      .then((res) => {
        console.log(res);
        alert(res.data.msg);
        setSub(true);
      })
      .catch((error) => console.log(error));
    setSub(false);
  };

  return (
    <>
      <div className="container flex justify-between bg-slate-400 border-2 rounded-xl p-2 px-7 text-xl my-1.5">
        {todo.task}
        <div className=" flex w-[12%] justify-between my-auto ">
          <BiEdit className="cursor-pointer" type="submit" onClick={onEdit} />
          <MdDelete
            className="cursor-pointer"
            type="submit"
            onClick={onDelete}
          />
        </div>
      </div>
    </>
  );
};

export default Todo;
