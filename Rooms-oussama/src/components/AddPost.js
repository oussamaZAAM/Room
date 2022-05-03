import React, {useRef, useContext, useState} from "react";
import {BsCardImage} from "react-icons/bs"
import axios from "axios"
import { AuthContext } from "../Context/authContext";


export default function AddPost() {
    const desc = useRef()
    const {user} = useContext(AuthContext)
    const [file, setFile] = useState(null);
    const [picture, setPicture] = useState('');

    const handleUpload = async (e) => {
        const pic=e.target.files[0];
        setFile(e.target.files[0])
        const data = new FormData();
        const fileName = Date.now() + pic.name;
        data.append("name", fileName);
        data.append("file", pic);
        setPicture(fileName)
        console.log(fileName)
        try {
            await axios.post("http://localhost:5000/api/upload", data);
          } catch (err) {}
    }

    const handlePost = async (e) => {
         e.preventDefault();
        const post = {desc:desc.current.value, userId:user._id}
        if (file) {
            
            post.photo = picture;
            
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
                <img src={"http://localhost:5000/images/" + user.picture} className="profileimage" />

                <input className="add-post-textarea" type="textarea" placeholder="What's on your mind?" ref={desc}/>
                <div>
                    <label>
                    <BsCardImage className="upload-image"/>
                    <input type="file" style={{display: "none"}} name="myImage" onChange={(e) => handleUpload(e)}/>
                    </label>
                    {picture!=='' && <img src={"http://localhost:5000/images/" + picture} />} 
                </div>
                
            </div>
            <div className="div-submit">
            <input className="add-submit" value="post" type="submit" onClick={handlePost}/>
            </div>
            </form>
        </div>
    )
}