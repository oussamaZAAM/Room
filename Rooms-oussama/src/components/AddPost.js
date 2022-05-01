import React, {useRef, useContext, useState} from "react";
import profileimage from "../images/profile.png"
import {BsCardImage} from "react-icons/bs"
import axios from "axios"
import { AuthContext } from "../Context/authContext";


export default function AddPost() {
    const desc = useRef()
    const {user} = useContext(AuthContext)
    const [file, setFile] = useState(null);

    const handlePost = async (e) => {
         //e.preventDefault();
        const post = {desc:desc.current.value, userId:user._id}
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            console.log(fileName);
            post.photo = fileName;
            try {
              await axios.post("http://localhost:5000/api/upload", data);
            } catch (err) {}
          }
            try{
                await axios.post("http://localhost:5000/api/posts",post);

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
                <input className="add-post-textarea" type="textarea" placeholder="What's on your mind?" ref={desc}/>
                <label>
                <BsCardImage />
               <input type="file" style={{display: "none"}} name="myImage" onChange={(e) => setFile(e.target.files[0])}/>
                </label>
                
            </div>
            <input className="add-submit" value="post" type="submit" onClick={e=>handlePost(e)}/>

            </form>
        </div>
    )
}