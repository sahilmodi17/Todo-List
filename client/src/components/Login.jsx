import axios from "axios";
import React, { useState , useContext} from "react";
// import Temp from "../context/Context"
import { Link, useNavigate } from "react-router-dom";
import {useUserContext} from "../context/Context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser} = useUserContext();
  
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const temp = { email, password };

    axios
      .post("/api/v1/auth/login", temp)
      .then((res) => {
        console.log(res.data.user);          
          nav("/todoform");
      })
      .catch((error) => {
        const err = error.response;
        console.log(error)
        if (err && err.status === 400) {
          setError(err.data.msg);
        } else {
          console.log(err)
          setError(error.response.data.error);
          console.log(error);
        }
      });
  };

  return (
    <>
      <div className="margin-3">
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white  border-gray-600 rounded shadow-lg shadow-gray-800/50 lg:max-w-md">
            <h1 className="text-3xl font-semibold text-center text-slate-700">
              Login
            </h1>

            <form className="mt-6">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-800"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    onClick={onSubmit}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-8 text-xs font-light text-center text-gray-700 ">
              {" "}
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-gray-600 hover:underline"
              >
                Register
              </Link>
              <div>{error && <div>{error}</div>}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
