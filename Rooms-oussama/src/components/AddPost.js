import React, {useRef, useContext, useState} from "react";
import {BsCardImage} from "react-icons/bs"
import axios from "axios"
import { AuthContext } from "../Context/authContext";


export default function AddPost() {
    const desc = useRef()
    const {user} = useContext(AuthContext)
    const [file, setFile] = useState(null); //Mettre un objet null vide dans le "state"
    const [picture, setPicture] = useState(''); //Mettre une chaine de charactere vide dans le "state"

    const handleUpload = async (e) => {
        const pic=e.target.files[0]; //Initialiser "pic" avec l'image telecharger depuis la machine
        setFile(e.target.files[0])
        const data = new FormData(); //Initialiser "data" par une Forme de donnes
        const fileName = Date.now() + pic.name; //Initialiser "fileName" par le nom de fichier telecharge
        data.append("name", fileName);
        data.append("file", pic);
        //Ajouter les informations de fichier telecharge a notre "data"
        try {
            await axios.post("http://localhost:5000/api/upload", data);
            //envoyer la donnee vers le "backend" avec "axios" dans le champs "upload"
          } catch (err) {}
          setPicture(fileName)
    }

    const handlePost = async (e) => {
        //Si il n'y a pas d'image ou de texte, empecher le rechargement de la page
        if(desc.current.value === "" && picture === ""){ 
            e.preventDefault();
        }
        if(desc.current.value !== "" || picture !== ""){
            const post = {desc:desc.current.value, userId:user._id, date: new Date()}
            if (picture!=="") {
                post.photo = picture;
            }
            try{
                await axios.post("http://localhost:5000/api/posts",post);
                //Envoyer le poste vers le "backend", et recharger la page pour que le poste s'affiche
            }catch(err){
                    console.log(err) //En cas d'erreur    
            }
        }
    }
    return(
        <div className="post-add">
            <div className="add-post-title">
                <h3>Add a Post</h3>
            </div>
            <form>
            <div className="add-post">
                {user.picture==="https://i.ibb.co/J25RQCT/profile.png" 
                    ? <img className="profileimage" src={user.picture} style={{marginRight: "10px"}}/>
                    : <img className="profileimage" src={"http://localhost:5000/images/" + user.picture} style={{marginRight: "10px"}}/>
                }

                <textarea className="add-post-textarea" type="textarea" placeholder="What's on your mind?" ref={desc}/>
                <div className="uploadimage">
                    <label>
                    <BsCardImage className="upload-image"/>
                    <input type="file" style={{display: "none"}} name="myImage" onChange={(e) => handleUpload(e)}/>
                    </label>

                    {picture!=='' && <img src={"http://localhost:5000/images/" + picture} width="100px"/>} 
                </div>
                
            </div>
            <div className="div-submit">
            <input className="add-submit" value="post" type="submit" onClick={handlePost}/>
            </div>
            </form>
        </div>
    )
}