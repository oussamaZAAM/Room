import React from "react"
import Navbar from "./Navbar"
import cover from "../images/post1.jpg"
import { AiFillEdit } from "react-icons/ai"
import RoomCard from "./RoomCard"
import Post from "./Post"
import { Posts, Rooms } from "../dummyData"

export default function Profile() {
    const userId=5;
    const Rooms1 = Rooms.filter(x=>{
        for(let i=0;i<x.roomers.length;i++){
            if(x.roomers[i].id==userId){
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
    const roomCards = Rooms1.map(x=>{
        for(let i=0;i<x.roomers.length;i++){
            if(x.roomers[i].id==userId){
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
    console.log(roomCards)
    const profilePosts = Posts.map(x=>{
        if (x.userId==1){
            return(
                <Post
                    key={x.id}
                    desc={x.desc}
                    img={x.photo}
                    date={x.date}
                    userId={x.userId}
                    room={x.room}
                    roomers={x.roomers}
                    vote={x.vote}
                    comments={x.comments}
                />
            )
        }
    })
    return(
        <div className="profile">
            <Navbar />
            <div className="profile-card">
                <div className="profile-images">
                    <AiFillEdit className="profile-cover-edit"/>
                    <img className="profile-cover" src={cover} />
                    <img className="profile-pic" src={cover} />
                    <AiFillEdit className="profile-pic-edit"/>
                </div>
                <div className="profile-name">
                    <h1>Alfredo Condo</h1>
                </div>
                <div className="profile-desc">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Fusce justo elit, volutpat sit amet cursus non, convallis vel nibh. 
                    Suspendisse potenti. 
                    Sed accumsan sapien faucibus metus pellentesque, sit amet accumsan diam imperdiet. 
                    Morbi eget nisl tempus, molestie est vel, vehicula lorem. Nulla facilisi.
                    </p>
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
            {profilePosts}
        </div>
    )
} 