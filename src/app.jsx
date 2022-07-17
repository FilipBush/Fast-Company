import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";
import SearchStatus from "./components/searchStatus"

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter(user=>user._id !== userId));
  };
  
  const handleToggleBookMark = (userId) => {
    const updatedUser = [...users];
    let userIndex = updatedUser.findIndex(item => item._id === userId)
    updatedUser[userIndex].bookmark = !updatedUser[userIndex].bookmark;
    setUsers(updatedUser);
  }

  return (
    <>
      <SearchStatus
        length = {users.length}
      />
      <Users 
        users = {users}
        onDelete = { handleDelete }
        onBookMark = { handleToggleBookMark }
      />
    </>
  )
}

export default App;