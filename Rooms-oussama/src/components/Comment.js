import React, { useEffect, useState } from "react"
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike} from "react-icons/ai"
import axios from "axios"
import { Link } from "react-router-dom";

export default function Comment(props) {
    const [users, setUsers] = useState([]);
    const [commentVote, setCommentVote] = useState(props.vote);
    const [isLiked, setIsLike] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    
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
    function upvote() {
        if(!isDisliked){
            if(!isLiked) {
                setCommentVote(prevVote=>prevVote+1);
                setIsLike(prevClick=>!prevClick);
            }else{
                setCommentVote(prevVote=>prevVote-1);
                setIsLike(prevClick=>!prevClick);
            }
        }else{
            setCommentVote(prevVote=>prevVote+2)
            setIsLike(prevClick=>!prevClick)
            setIsDisliked(prevClick=>!prevClick);
        }
    }
    function downvote() {
        if(!isLiked){
            if(!isDisliked) {
                setCommentVote(prevVote=>prevVote-1);
                setIsDisliked(prevClick=>!prevClick);
            }else{
                setCommentVote(prevVote=>prevVote+1);
                setIsDisliked(prevClick=>!prevClick);
            }
        }else{
            setCommentVote(prevVote=>prevVote-2)
            setIsLike(prevClick=>!prevClick)
            setIsDisliked(prevClick=>!prevClick);
        }
    }
    return(
        <div className="comment-grid">
            <div>
                <img  className="profileimage" src={userImg(props.userId)} />
            </div>
            <div className="comment-content">
                <div className="comment-header">
                    <Link to={"../"+props.userId}> <h5>{userName(props.userId)}</h5></Link>
                    <div className="comment-like">
                        {isLiked 
                            ? <AiFillLike className="comment-like" onClick={upvote}/> 
                            : <AiOutlineLike className="comment-like" onClick={upvote} /> }
                        <small style={{margin: "10px"}}>{commentVote}</small>
                        {isDisliked 
                            ? <AiFillDislike className="comment-like" onClick={downvote} /> 
                            : <AiOutlineDislike className="comment-like" onClick={downvote} />}
                    </div>
                </div>
                <small style={{marginLeft: "10px"}}>{props.date}</small>
                <p>{props.content}</p>
            </div>
        </div>
    )
}