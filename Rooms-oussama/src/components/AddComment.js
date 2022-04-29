import React from "react";
import profileimage from "../images/profile.png"
import {BsCardImage} from "react-icons/bs"

export default function AddPost() {
    return(
        <div className="comment-add">
            <div className="add-comment-title">
                <h3>Add a Comment</h3>
            </div>
            <div className="add-comment">
                <img src={profileimage} className="profileimage" />
                <div className="add-comment-text">
                    <textarea className="add-comment-textarea" placeholder="New Comment" />
                </div>
            </div>
            <div className="add-submit">
                <button>Post</button>
            </div>
        </div>
    )
}