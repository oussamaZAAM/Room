import React, { useContext, useEffect, useRef, useState } from "react"
import Navbar from "./Navbar"
import { AiFillEdit, AiOutlineClose } from "react-icons/ai"
import RoomCard from "./RoomCard"
import Post from "./Post"
import { Posts, Rooms } from "../dummyData"
import axios from "axios"
import { AuthContext } from "../Context/authContext"
import AddPost from "./AddPost"
import Modal from 'react-modal';
import { BsCardImage } from "react-icons/bs"

export default function Profile() {
    const [posts, setPosts] = useState([]);
    const { user, dispatch } = useContext(AuthContext);
    const [profPic, setProfPic] = useState(null);
    const [coverPic, setCoverPic] = useState(null);
    const desc = useRef();

    
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
       
           
    const Rooms1 = Rooms.filter(x=>{
        for(let i=0;i<x.roomers.length;i++){
            if(x.roomers[i].id==user._id){
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
            if(x.roomers[i].id==user._id){
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
    
    useEffect(() => {
        const changeProfPic = async () => {
        if (profPic) {
            const data = new FormData();
            const fileName = Date.now() + profPic.name;
            data.append("name", fileName);
            data.append("file", profPic);
            console.log(fileName);
            
            try {
              await axios.post("http://localhost:5000/api/upload", data);
            } catch (err) {
                console.log(err)
            }
            dispatch({ type: "LOGIN_SUCCESS", payload: {...user, picture:fileName}});
            localStorage.setItem("user", JSON.stringify({...user,picture:fileName}));
            await axios.put(`http://localhost:5000/api/user/${user._id}`, {...user, picture:fileName})
          }
        }
        changeProfPic();
        const changeCoverPic = async () => {
        if (coverPic) {
            const data = new FormData();
            const fileName = Date.now() + coverPic.name;
            data.append("name", fileName);
            data.append("file", coverPic);
            console.log(fileName);
            
            try {
              await axios.post("http://localhost:5000/api/upload", data);
            } catch (err) {
                console.log(err)
            }
            dispatch({ type: "LOGIN_SUCCESS", payload: {...user, cover:fileName}});
            localStorage.setItem("user", JSON.stringify({...user,cover:fileName}));
            await axios.put(`http://localhost:5000/api/user/${user._id}`, {...user, cover:fileName})
          }
        }
        changeCoverPic();
        const fetchPosts = async () => {
        const res = await axios.get("http://localhost:5000/api/posts/timeline/" + user._id);
        setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
        );
        };
        fetchPosts();
    }, [user._id, profPic, coverPic]);
    const myPosts = posts.map(x=>{
        return(
           <Post 
                key={x._id}
                // post={x}
                desc={x.desc}
                img={x.photo}
                date={x.createdAt}
                userId={x.userId}
                room={x.room}
                roomers={x.roomers}
                vote={x.likeCount}
                comments={x.comments}
                />
    )})

    return(
        <div className="profile">
            <Navbar />
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <div className="profile-modal">
                    <div className="modal-close">
                        <AiOutlineClose onClick={closeModal} className="modal-close-btn" />
                    </div>
                    <div className="modal-form"> 
                        <div className="flex-row">
                            <h3 style={{width: "200px"}}>Profile :</h3>
                            <img src={"http://localhost:5000/images/" +user.picture} width="100px"/>
                            <label>
                                <BsCardImage className="upload-image"/>
                                <input type="file" style={{display: "none"}} name="myImage" onChange={(e) => setProfPic(e.target.files[0])}/>
                            </label>
                        </div>
                        <div className="flex-row">
                            <h3 style={{width: "200px"}}>Cover :</h3>
                            <img src={"http://localhost:5000/images/" +user.cover} width="100px" />
                            <label>
                                <BsCardImage className="upload-image"/>
                                <input type="file" style={{display: "none"}} name="myImage" onChange={(e) => setCoverPic(e.target.files[0])}/>
                            </label>
                        </div>
                    </div>
                    <h2>Edit Profile</h2>
                    <form className="modal-form">
                        <div className="flex-row">
                            <h3 style={{width: "200px"}}>Username :</h3>
                            <input className="login-input" placeholder={user.username} />
                        </div>
                        <div className="flex-row">
                            <h3 style={{width: "200px"}}>Email :</h3>
                            <input className="login-input" placeholder={user.email} />
                        </div>
                        <div className="flex-row">
                            <h3 style={{width: "200px"}}>Password :</h3>
                            <input className="login-input" placeholder="Password" />
                        </div>
                        <div className="flex-row">
                            <h3 style={{width: "250px"}}>Description :</h3>
                            <input className="login-textarea" type="textarea" placeholder="Description" ref={desc}/>
                        </div>
                        <input type="submit" className="add-submit" />
                    </form>
                </div>
            </Modal>
            <div className="profile-card">
                <div className="profile-images">
                    <img className="profile-cover" src={"http://localhost:5000/images/" +user.cover} />
                    <img className="profile-pic" src={"http://localhost:5000/images/" +user.picture} />
                </div>
                <div className="profile-name">
                    <h1>{user.username}</h1>
                </div>
                <div className="profile-desc">
                    {user.desc 
                        ? <div className="edit-desc">
                            <p>{user.desc}</p>
                            <AiFillEdit className="profile-pic-edit"/>
                          </div>
                        : <div className="div-submit" style={{marginBottom: "10px"}}>
                            <button className="add-submit"><b>Add Description</b></button>
                          </div> 
                    }
                </div>
                <label>
                    <AiFillEdit onClick={openModal} className="profile-pic-edit"/>
                </label>
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
            <AddPost />
            {myPosts}
        </div>
    )
} 