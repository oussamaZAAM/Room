import React, {useRef, useContext} from "react";
import profileimage from "../images/profile.png"
import {BsCardImage} from "react-icons/bs"
import axios from "axios"
import { AuthContext } from "../Context/authContext";


export default function AddPost() {
    const desc = useRef()
    const {user} = useContext(AuthContext)

    const handlePost = async (e) => {
        // e.preventDefault();
        const user1 = {desc:desc.current.value, userId:user._id}
            try{
                await axios.post("http://localhost:5000/api/posts",user1);

            }catch(err){
                 console.log(err)        
            }
    }
    return(
        <div className="post-add">
            <div className="add-post-title">
                <h3>Add a Post</h3>
            </div>
            <form>
            <div className="add-post">
                <img src={profileimage} className="profileimage" />
                {/* <div className="add-post-text"> */}
                <input className="add-post-textarea" type="textarea" placeholder="What's on your mind?" ref={desc}/>
                {/* </div> */}
                <button className="add-image"><BsCardImage /></button>
            </div>
            <div className="div-submit">
            <input className="add-submit" value="post" type="submit" onClick={handlePost}/>
            </div>
            </form>
        </div>
    )
}