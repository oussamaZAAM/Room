import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Profile from "./Profile";
import SearchedUser from "./SearchedUser";

export default function Searching(props) {
    const [users, setUsers] = useState([]);


    function userName(thisId) {
        for (let i=0;i<users.length;i++){
            if(users[i]._id==thisId){
                return(users[i].username)
            }
        }
    }
    function userImg(thisId) {
        for (let i=0;i<users.length;i++){
            if(users[i]._id==thisId){
                return(users[i].picture)
            }
        }
    }


    useEffect(() => {
        const fetchUsers = async () => {
        const res = await axios.get("http://localhost:5000/api/user/allusers");
        setUsers(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
        );
        };
        fetchUsers();
    }, []);

    const allUsers = users.map(x=>{
        return(x.username.includes(props.userId)?<SearchedUser key={x._id} username={x.username} image={x.picture} />:null )
    }
        )

    return(
        <>
            <Navbar />
            <div className="post">
                <h2 className="search-title">People</h2>
                <div className="search-div">
                    {allUsers}
                </div>
                {/* <h2 className="search-title">Rooms</h2>
                <div className="search-div">
                    {allUsers}
                </div> */}
            </div>
        </>
    )
}