import React, { useContext, useEffect, useState } from "react"
import {motion, AnimatePresence} from 'framer-motion'

import Navbar from "./Navbar"
// import cover from "../images/post1.jpg"
import { AiFillEdit, AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import RoomCard from "./RoomCard"
import Post from "./Post"
import { Rooms } from "../dummyData"
import axios from "axios"
import { AuthContext } from "../Context/authContext"
import { MdNotificationsActive } from "react-icons/md"
import Notification from "./Notification"
// import AddPost from "./AddPost"

export default function OtherProfile(props) {
    const showStyle = {display: "flex", flexDirection: "column"}
    const hideStyle = {display: "none"}
    const [notifStyle, setNotifStyle] = useState(hideStyle);
    const [isNotifClicked, setIsNotifClicked] = useState(false);
    const [isMsgClicked, setIsMsgifClicked] = useState(false);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [likeNotes, setLikeNotes] = useState([]);
  const [dislikeNotes, setDislikeNotes] = useState([]);
  const [commentNotes, setCommentNotes] = useState([]);
    const {user, dispatch}  = useContext(AuthContext);
    
    function handleNotif() {
        setIsNotifClicked(true)
        setIsMsgifClicked(false)
        setNotifStyle(prev=>(prev.display==="none" ? showStyle : hideStyle))
    }

    function getUser(thisId){
        for (let i=0;i<users.length;i++){
            if(users[i]._id===thisId){
                return users[i]
            }
        }
    }
    //Detetmine le nom d'utilisateur depuis son idetifiant
    function userName(thisId) {
        for (let i=0;i<users.length;i++){
            if(users[i]._id===thisId){
                return(users[i].username)
            }
        }
    }
    //Detetmine la photo de profil d'utilisateur depuis son idetifiant
    function userImg(thisId) {
        for (let i=0;i<users.length;i++){
            if(users[i]._id===thisId){
                return(users[i].picture)
            }
        }
    }
    //Detetmine la photo de couverture d'utilisateur depuis son idetifiant
    function userCover(thisId) {
        for (let i=0;i<users.length;i++){
            if(users[i]._id===thisId){
                return(users[i].cover)
            }
        }
    }
    //Detetmine la description d'utilisateur depuis son idetifiant
    function userDesc(thisId) {
        for (let i=0;i<users.length;i++){
            if(users[i]._id===thisId){
                return(users[i].desc)
            }
        }
    }
    
    //Amener tous les utilisateurs
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
    const Rooms1 = Rooms.filter(x=>{
        for(let i=0;i<x.roomers.length;i++){
            if(x.roomers[i].id===props.userId){
                return(
                    <RoomCard 
                        img={x.roomImg}
                        title={x.roomTitle}
                        roomers={x.roomers}
                        className="profile-col"
                    />
                )
            }
        }
    })
    const roomCards = Rooms1.map(x=>{
        for(let i=0;i<x.roomers.length;i++){
            if(x.roomers[i].id===props.userId){
                return(
                    <RoomCard 
                        key={x.roomId}
                        img={x.roomImg}
                        title={x.roomTitle}
                        roomers={x.roomers}
                        className="profile-col"
                    />
                )
            }
        }
    })
    
    //Amener les postes depuis le "backend"
    useEffect(() => {
        const fetchPosts = async () => {
        const res = await axios.get("http://localhost:5000/api/posts/profile1/" + props.userId); 
        setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.date) - new Date(p1.date);
            })
        );
        };
        fetchPosts();
    }, [props.userId]);
    //Envoyer les publications chacune a sa composante avec ses "props"
    const otherPosts = posts.map(x=>{
        return(
           <Post 
                key={x._id}
                id={x._id}
                post={x}
                desc={x.desc}
                img={x.photo}
                date={x.date}
                userId={x.userId}
                room={x.room}
                like={x.likes}
                disLike={x.dislikes}
                roomers={x.roomers}
                vote={x.likeCount}
                comments={x.comments}
                sharer={x.sharer}
                shareDesc={x.shareDesc}
                shareDate={x.shareDate}
                />
    )})
    const handleFollow =  async () => {
        const followingList = user.following;
        const followersList = getUser(props.userId).followers;
        if(!followingList.includes(props.userId)){
            followingList.push(props.userId)
        } else {
            var index = followingList.indexOf(props.userId)
            followingList.splice(index,1)
        }
        if(!followersList.includes(user._id)){
            followersList.push(user._id)
        } else {
            var index2 = followersList.indexOf(user._id)
            followersList.splice(index2,1)
        }
        
        await axios.put(`http://localhost:5000/api/user/${user._id}`, {...user, following: followingList})
        dispatch({ type: "LOGIN_SUCCESS", payload: {...user, following:followingList}});
        localStorage.setItem("user", JSON.stringify({...user, following:followingList}));
        await axios.put(`http://localhost:5000/api/user/${props.userId}`, {...getUser(props.userId), followers: followersList})
    } 
    return(
<>
            <Navbar handleNotif={handleNotif}/>
            {isNotifClicked &&
              <div style={notifStyle} className="notification">
                <div className="notif-bell"><MdNotificationsActive /></div>
                {notif2.length !==0 ? notif2 : <h5>How Empty!</h5>}
              </div>
            }
            <AnimatePresence>
            <motion.dev initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
        <div className="profile">
            <div className="profile-card">
                <div className="profile-images">
                    {userCover(props.userId)==="https://i.ibb.co/MVjMppt/cover.jpg" 
                        ? <img className="profile-cover" src={userCover(props.userId)} alt="Cover image"/>
                        : <img className="profile-cover" src={"http://localhost:5000/images/" + userCover(props.userId)} alt="Cover image"/>
                    }
                    {userImg(props.userId)==="https://i.ibb.co/J25RQCT/profile.png" 
                        ? <img className="profile-pic" src={userImg(props.userId)} alt="Profile image"/>
                        : <img className="profile-pic" src={"http://localhost:5000/images/" + userImg(props.userId)} alt="Profile image"/>
                    }
                </div>
                <div className="profile-name">
                    <h1>{userName(props.userId)}</h1>
                    <div className="profile-add">
                        {!user.following.includes(props.userId)
                            ? <AiOutlinePlusCircle size={30} onClick={handleFollow}/>
                            : <AiFillPlusCircle size={30} onClick={handleFollow}/>
                        }
                        <b onClick={handleFollow}>{user.following.includes(props.userId)?"Unfollow":"Follow"}</b>
                    </div>
                </div>
                <div className="profile-desc">
                    <p>{userDesc(props.userId)}</p>
                </div>
            </div>
            <div className="profile-rooms">
                <h1 className="rooms-title">Rooms</h1>
                <div className="profile-room-grid">
                    {roomCards.length!==0
                        ? roomCards
                        : <h1 className="how-empty">How Empty</h1>
                    }
                </div>
                {roomCards.length!==0
                    ? <div><button className="allrooms-button">See all Rooms</button></div>
                    : <div><button className="allrooms-button">See new Rooms</button></div>
                }
            </div>
            {otherPosts}
        </div>
        </motion.dev>
         </AnimatePresence>
        </>
    )
} 