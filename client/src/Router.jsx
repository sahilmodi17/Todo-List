import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

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
    path: "/protected",
    element: <Todo />,
  },
  {
    path: "/todoform",
    element: <TodoForm />,
  },
]);

export default router ;