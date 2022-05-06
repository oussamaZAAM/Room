import axios from "axios";
import React, { useContext, useRef, useState, useEffect } from "react";
import { AiFillPropertySafety } from "react-icons/ai";
import {BsCardImage} from "react-icons/bs"
import { AuthContext } from "../Context/authContext";

export default function AddComment(props) {
    const content = useRef()
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)
    useEffect(() => {
        const fetchPosts = async () => {
          const res = await axios.get("http://localhost:5000/api/posts/" + props.post._id);
        //   console.log(res.data.comments)
        //   const post = res.data.comments.filter(comment=>comment.date===props.comments.userId)
          setPosts(res.data)
        };
        fetchPosts();
      }, [user._id, props.post.comments]);
    const handleComment = async (e)=>{
        e.preventDefault()
        const res = await axios.get("http://localhost:5000/api/posts/" + props.post._id);
        // console.log(res.data)
        await axios.put("http://localhost:5000/api/posts/"+ props.post._id, {...props.post, comments:[...res.data.comments,{userId:user._id,content:content.current.value,date:new Date(),likes:[], dislikes:[]}]})
        // const res1 = await axios.get("http://localhost:5000/api/posts/" + props.post._id);
        // console.log(res1.data)

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
                    <textarea type='textarea' className="add-comment-textarea" placeholder="New Comment" ref={content} />
                </div> 
            </div>
            <div className="div-submit">
                <input type='submit' className="add-submit" value={"Post"} onClick={handleComment} />
            </div>
            </form>
        </form>
    )
}