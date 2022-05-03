import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios"

export default function SearchResult() {

    const fetchUsers = async () => {
        const res = await axios.get("http://localhost:5000/api/user/allusers");
        const users = res.data;
        const usersList = users.map((user)=>{return (user.username)});
        const usersList1 = usersList.map(u=><div>{u}</div>)
        console.log(usersList1)
        return usersList1
      };
    const users=fetchUsers();
    return(
        <div>
        <Navbar />
        {users}
        
        </div>
    )
}