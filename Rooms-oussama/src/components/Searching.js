import axios from "axios";
import React, { useEffect, useState } from "react";
import {motion, AnimatePresence} from 'framer-motion'

import Navbar from "./Navbar";
import SearchedUser from "./SearchedUser";
import { MdNotificationsActive } from "react-icons/md";
import Notification from "./Notification";

export default function Searching(props) {
    const showStyle = {display: "flex", flexDirection: "column"}
    const hideStyle = {display: "none"}
    const [notifStyle, setNotifStyle] = useState(hideStyle);
    const [isNotifClicked, setIsNotifClicked] = useState(false);
    const [isMsgClicked, setIsMsgifClicked] = useState(false);
    const [users, setUsers] = useState([]);

    
    function handleNotif() {
        setIsNotifClicked(true)
        setIsMsgifClicked(false)
        setNotifStyle(prev=>(prev.display==="none" ? showStyle : hideStyle))
    }


    //Detetmine le nom d'utilisateur depuis son idetifiant
    // function userName(thisId) {
    //     for (let i=0;i<users.length;i++){
    //         if(users[i]._id===thisId){
    //             return(users[i].username)
    //         }
    //     }
    // }
    //Detetmine la photo de profil d'utilisateur depuis son idetifiant
    // function userImg(thisId) {
    //     for (let i=0;i<users.length;i++){
    //         if(users[i]._id===thisId){
    //             return(users[i].picture)
    //         }
    //     }
    // }


    //Amener tous les utilisateurs
    useEffect(() => {
        const fetchUsers = async () => {
        const res = await axios.get("http://localhost:5000/api/user/allusers");
        setUsers(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
        )};
        fetchUsers();
    }, []);

    const searchedUsers = users.map(x=>{
        return(x.username.toLowerCase().includes(props.userId.toLowerCase()) //Rendre le recherche insensible au majuscules et miniscules
            ?(<AnimatePresence>
            <motion.dev initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <SearchedUser key={x._id} id={x._id} username={x.username} image={x.picture} />
                </motion.dev>
            </AnimatePresence>):null)
        }
    )

    return(
        <>
            <Navbar handleNotif={handleNotif}/>
            {isNotifClicked &&
              <div style={notifStyle} className="notification">
                <div className="notif-bell"><MdNotificationsActive /></div>
                <Notification />
                <Notification />
                <Notification />
                <Notification />
              </div>
            }
            <div className="post">
                <h2 className="search-title">People</h2>
                <div className="search-div">
                    {searchedUsers}
                </div>
                {/* <h2 className="search-title">Rooms</h2>
                <div className="search-div">
                    {searchedUsers}
                </div> */}
            </div>
        </>
    )
}