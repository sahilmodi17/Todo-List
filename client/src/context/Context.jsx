import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {

  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [tid, setTid] = useState(null);

  return (
    <UserContext.Provider
      value={{ todos, setTodos, edit, setEdit, tid, setTid }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
