import React, { useContext, useEffect, useState } from "react"
import Navbar from "./Navbar"
import cover from "../images/post1.jpg"
import { AiFillEdit } from "react-icons/ai"
import RoomCard from "./RoomCard"
import Post from "./Post"
import { Posts, Rooms } from "../dummyData"
import axios from "axios"
import { AuthContext } from "../Context/authContext"
import AddPost from "./AddPost"

export default function OtherProfile(props) {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    //Detetmine le nom d'utilisateur depuis son idetifiant
    function userName(thisId) {
        for (let i=0;i<users.length;i++){
            if(users[i]._id==thisId){
                return(users[i].username)
            }
        }
    }
    //Detetmine la photo de profil d'utilisateur depuis son idetifiant
    function userImg(thisId) {
        for (let i=0;i<users.length;i++){
            if(users[i]._id==thisId){
                return(users[i].picture)
            }
        }
    }
    //Detetmine la photo de couverture d'utilisateur depuis son idetifiant
    function userCover(thisId) {
        for (let i=0;i<users.length;i++){
            if(users[i]._id==thisId){
                return(users[i].cover)
            }
        }
    }
    //Detetmine la description d'utilisateur depuis son idetifiant
    function userDesc(thisId) {
        for (let i=0;i<users.length;i++){
            if(users[i]._id==thisId){
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
    }, []);

    const Rooms1 = Rooms.filter(x=>{
        for(let i=0;i<x.roomers.length;i++){
            if(x.roomers[i].id==props.userId){
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
            if(x.roomers[i].id==props.userId){
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
        const res = await axios.get("http://localhost:5000/api/posts/timeline/" + props.userId);
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
                />
    )})
    return(
        <div className="profile">
            <Navbar />
            <div className="profile-card">
                <div className="profile-images">
                    <img className="profile-cover" src={"http://localhost:5000/images/" + userCover(props.userId)} />
                    <img className="profile-pic" src={"http://localhost:5000/images/" + userImg(props.userId)} />
                </div>
                <div className="profile-name">
                    <h1>{userName(props.userId)}</h1>
                </div>
                <div className="profile-desc">
                    <p>{userDesc(props.userId)}</p>
                </div>
            </div>
            <div className="profile-rooms">
                <h1 className="rooms-title">Rooms</h1>
                <div className="profile-room-grid">
                    {roomCards.length!=0
                        ? roomCards
                        : <h1 className="how-empty">How Empty</h1>
                    }
                </div>
                {roomCards.length!=0
                    ? <div><button className="allrooms-button">See all Rooms</button></div>
                    : <div><button className="allrooms-button">See new Rooms</button></div>
                }
            </div>
            {otherPosts}
        </div>
    )
} 