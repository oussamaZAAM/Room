import axios from "axios";
import React, { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../Context/authContext";

export default function AddComment(props) {
    const content = useRef()
    const [posts, setPosts] = useState([]) //Mettre les postes dans un Array vide de "state"
    const { user } = useContext(AuthContext)
    //Amener les donnees des postes depuis le "backend"
    useEffect(() => {
        const fetchPosts = async () => {
          const res = await axios.get("http://localhost:5000/api/posts/" + props.post._id);
          setPosts(res.data) //Changer la valeur de "state" des postes
        };
        fetchPosts();
      }, [user._id, props.post.comments]); //Re-amener les postes a l'echange des id ou les commentaires
    const handleComment = async (e)=>{
        e.preventDefault()
        const res = await axios.get("http://localhost:5000/api/posts/" + props.post._id);
        //Modifier le poste identifie par le "id" dans les "props" par l'objet dont les commentaires sont ajoutes
        await axios.put("http://localhost:5000/api/posts/"+ props.post._id, {...props.post, comments:[...res.data.comments,{userId:user._id,username:user.username, postId:props.post._id, content:content.current.value,date:new Date(),likes:[], dislikes:[]}]})
    }
    return(
        <form className="comment-add">
            <div className="add-comment-title">
                <h3>Add a Comment</h3>
            </div>
            <form>
            <div className="add-comment">
                {user.picture==="https://i.ibb.co/J25RQCT/profile.png" 
                    ? <img className="profileimage" src={user.picture} />
                    : <img className="profileimage" src={"http://localhost:5000/images/" + user.picture} />
                }
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