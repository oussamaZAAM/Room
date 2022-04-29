import React from "react";
import profileimage from "../images/profile.png"
import {BsCardImage} from "react-icons/bs"

export default function AddPost() {
    return(
        <div className="post-add">
            <div className="add-post-title">
                <h3>Add a Post</h3>
            </div>
            <div className="add-post">
                <img src={profileimage} className="profileimage" />
                <div className="add-post-text">
                    <textarea className="add-post-textarea" placeholder="What's on your mind?" />
                </div>
                <button className="add-image"><BsCardImage /></button>
            </div>
        </div>
    )
}