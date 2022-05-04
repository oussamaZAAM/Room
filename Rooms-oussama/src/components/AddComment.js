import axios from "axios";
import React, { useContext, useRef } from "react";
import { AiFillPropertySafety } from "react-icons/ai";
import {BsCardImage} from "react-icons/bs"
import { AuthContext } from "../Context/authContext";

export default function AddComment() {
    const content = useRef()
    const { user } = useContext(AuthContext)
    const handleComment = async ()=>{
        await axios.put("http://localhost:5000/api/posts/"+ props.post._id, {...post, comments:[...props.post.comments,{userId:user._id,content:content.current.value,date:new Date()}]})
    }
    return(
        <form className="comment-add">
            <div className="add-comment-title">
                <h3>Add a Comment</h3>
            </div>
            <form>
            <div className="add-comment">
                <img src={"http://localhost:5000/images/" + user.picture} className="profileimage"/>
                <div className="add-comment-text">
                    <input type='textarea' className="add-comment-textarea" placeholder="New Comment" ref={content} />
                </div> 
            </div>
            <div className="div-submit">
                <input type='submit' className="add-submit" value={"Post"} onClick={handleComment} />
            </div>
            </form>
        </form>
    )
}