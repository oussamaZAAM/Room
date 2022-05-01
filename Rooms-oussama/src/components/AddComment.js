import React, { useContext } from "react";
import {BsCardImage} from "react-icons/bs"
import { AuthContext } from "../Context/authContext";

export default function AddComment() {
    const { user } = useContext(AuthContext)
    return(
        <form className="comment-add">
            <div className="add-comment-title">
                <h3>Add a Comment</h3>
            </div>
            <div className="add-comment">
                <img src={"http://localhost:5000/images/" + user.picture} className="profileimage" />
                <div className="add-comment-text">
                    <textarea className="add-comment-textarea" placeholder="New Comment" />
                </div> 
            </div>
            <div className="div-submit">
                <button className="add-submit">Post</button>
            </div>
        </form>
    )
}