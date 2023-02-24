import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import Register from "./Register";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/update",
    element: <Todo />,
  },
  {
    path: "/todoform",
    element: <TodoForm />,
  },
]);

export default router ;