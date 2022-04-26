import React, { useState } from "react"
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike} from "react-icons/ai"
import { Users } from "../dummyData";

export default function Comment(props) {
    const [commentVote, setCommentVote] = useState(props.vote);
    const [isLiked, setIsLike] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    
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
                    <h5>{userName(props.userId)}</h5>
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