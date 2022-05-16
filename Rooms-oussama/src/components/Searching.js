import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import {motion, AnimatePresence} from 'framer-motion'
import { AuthContext } from "../Context/authContext"

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
    const [likeNotes, setLikeNotes] = useState([]);
  const [dislikeNotes, setDislikeNotes] = useState([]);
  const [commentNotes, setCommentNotes] = useState([]);
    const [users, setUsers] = useState([]);
    const {user}  = useContext(AuthContext);

    
    function handleNotif() {
        setIsNotifClicked(true)
        setIsMsgifClicked(false)
        setNotifStyle(prev=>(prev.display==="none" ? showStyle : hideStyle))
    }


   


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
        const fetchLikes = async () => {
            const res = await axios.get("http://localhost:5000/api/posts/profile1/" + user._id);
            const likeNotif = []
            res.data.forEach(post=>{
                 likeNotif.push(post.likes.map(x=>[...x, 'like']))
            })
            setLikeNotes(
              likeNotif.flat().sort((p1, p2) => {
                return new Date(p2[1]) - new Date(p1[1]);
              })
            );
          };
          fetchLikes();
          const fetchDislikes = async () => {
            const res = await axios.get("http://localhost:5000/api/posts/profile1/" + user._id);
            const dislikeNotif = []
            res.data.forEach(post=>{
                 dislikeNotif.push(post.dislikes.map(x=>[...x, 'dislike']))
            })
            setDislikeNotes(
              dislikeNotif.flat().sort((p1, p2) => {
                return new Date(p2[1]) - new Date(p1[1]);
              })
            );
          };
          fetchDislikes();
          const fetchComments = async () => {
            const res = await axios.get("http://localhost:5000/api/posts/profile1/" + user._id);
            const commentNotif = []
            res.data.forEach(post=>{
                 commentNotif.push(post.comments.map(x=>{return {...x, type:'dislike'}}))
            })
            setCommentNotes(
              commentNotif.flat().sort((p1, p2) => {
                return new Date(p2[1]) - new Date(p1[1]);
              })
            );
          };
          fetchComments();
    }, []);
    const notif=likeNotes.concat(dislikeNotes)
    const notiff=notif.concat(commentNotes)
    const notif1 = notiff.sort((p1, p2) => {
      if(Array.isArray(p1) && Array.isArray(p2)) {
        return new Date(p2[2]) - new Date(p1[2])
      }
      if(Array.isArray(p1) && !Array.isArray(p2)) {
        return new Date(p2.date) - new Date(p1[2])
      }
      if(!Array.isArray(p1) && !Array.isArray(p2)) {
        return new Date(p2.date) - new Date(p1.date)
      }
      if(!Array.isArray(p1) && Array.isArray(p2)) {
        return new Date(p2[2]) - new Date(p1.date)
      }
    })
    const notif2 = notif1.map(x=>{
      return(
            <Notification 
              key={x.date}
              x={x}
            />
      )})
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
                {notif2.length !==0 ? notif2 : <h5>How Empty!</h5>}
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