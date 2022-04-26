import React, { useContext, useState } from "react";
import profileimage from "../images/profile.png"
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike, AiOutlineClose} from "react-icons/ai"
import { BiComment } from "react-icons/bi"
import { FiShare } from "react-icons/fi"
import Comment from "./Comment";
import { AuthContext } from "../Context/authContext";
import { Users } from "../dummyData";

export default function Post(props) {
    const [vote, setVote] = useState(props.vote);
    const [isLiked, setIsLike] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [roomers, setRoomers] = useState(props.roomers);
    const [comment, setComment] = useState(false);
    const {user} = useContext(AuthContext)
    const comments = props.comments.map(x=>
        <Comment 
            key={x.id}
            user={x.user}
            content={x.content}
            vote={x.vote}
            date={x.date}
        />
    )
    
    function userName(thisId) {
        for (let i=0;i<Users.length;i++){
            if(Users[i].id==thisId){
                return(Users[i].username)
            }
        }
    }
    function userImg(thisId) {
        for (let i=0;i<Users.length;i++){
            if(Users[i].id==thisId){
                return(Users[i].profilePicture)
            }
        }
    }
    function upvote() {
        if(!isDisliked){
            if(!isLiked) {
                setVote(prevVote=>prevVote+1);
                setRoomers(prevRoomer=>prevRoomer+1);
                setIsLike(prevClick=>!prevClick);
            }else{
                setVote(prevVote=>prevVote-1);
                setRoomers(prevRoomer=>prevRoomer-1);
                setIsLike(prevClick=>!prevClick);
            }
        }else{
            setVote(prevVote=>prevVote+2)
            setIsLike(prevClick=>!prevClick)
            setIsDisliked(prevClick=>!prevClick);
        }
    }
    function downvote() {
        if(!isLiked){
            if(!isDisliked) {
                setVote(prevVote=>prevVote-1);
                setRoomers(prevRoomer=>prevRoomer+1);
                setIsDisliked(prevClick=>!prevClick);
            }else{
                setVote(prevVote=>prevVote+1);
                setRoomers(prevRoomer=>prevRoomer-1);
                setIsDisliked(prevClick=>!prevClick);
            }
        }else{
            setVote(prevVote=>prevVote-2)
            setIsLike(prevClick=>!prevClick)
            setIsDisliked(prevClick=>!prevClick);
        }
    }
    function handlecomment() {
        setComment(prevComment=>!prevComment)
    }
    return(
        <div className="post">
            <div className="post-grid">
                <img className="profileimage" src={profileimage} />
                <div className="post-room-name">
                    <h5><b>{props.post.room} -</b> <small>{user.username}</small></h5>
                    <p><small>{props.post.date}</small></p>
                </div>
                <button className="text-button"><h3>...</h3></button>
            </div>
            <div className="post-desc">
                <p>{props.post.desc}</p>
            </div>
            <div>
                <img src={props.post.img} width="100%" />
            </div>
            <div className="post-interact">
                <div className="post-rating">
                    <AiFillLike className="post-like"/>
                    <small>{roomers} Roomers</small>
                    <small>{props.post.comments.length} comments</small>
                </div>
                <div className="post-rate">
                    <div>
                        {isLiked
                            ? <AiFillLike onClick={()=>upvote()} className="post-like"/>
                            : <AiOutlineLike onClick={()=>upvote()} className="post-like"/>
                        }
                        <small>{vote}</small>
                        {isDisliked
                            ? <AiFillDislike onClick={()=>downvote()} className="post-like"/>
                            : <AiOutlineDislike onClick={()=>downvote()} className="post-like"/>
                        }
                    </div>
                    <div onClick={props.posts.comments.length!=0 && handlecomment}>
                        <div style={{cursor: "pointer"}} className="hover-background">
                            <BiComment />
                            <small style={{marginLeft:"5px"}}> comments</small>
                        </div>
                    </div>
                    <div className="hover-cursor">
                        <div className="hover-background">
                            <FiShare />
                            <small style={{marginLeft:"5px"}}>share</small>
                        </div>
                    </div>
                </div>
            </div>
            {comment && 
              <div className="comment">
                {props.posts.comments.length!=0 && 
                    <div className="comment-close"><AiOutlineClose className="hover-background" onClick={()=>handlecomment()} /></div>
                }
                {comments}
              </div>
            }
        </div>
    )
}   