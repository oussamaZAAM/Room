import React, { useContext, useEffect, useState } from "react";
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike, AiOutlineClose, AiFillDelete, AiFillEdit, AiOutlineVerified, AiOutlineCheck} from "react-icons/ai"
import { BiComment, BiCrosshair } from "react-icons/bi"
import { FiShare } from "react-icons/fi"
import Comment from "./Comment";
import { AuthContext } from "../Context/authContext";
import AddComment from "./AddComment";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";



export default function Post(props) {
    const showStyle = {display: "flex"}
    const hideStyle = {display: "none"}
    const [users, setUsers] = useState([]);
    const [vote, setVote] = useState(props.like.length-props.disLike.length);
    const [roomers, setRoomers] = useState(props.like.length+props.disLike.length);
    const [comment, setComment] = useState(false);
    const [editClicked, setEditClicked] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [style, setStyle] = useState(hideStyle);
    const [descValue,setDescValue] = useState(props.desc);
    const [description,setDescription] = useState(props.desc);
    const [likeState, setLikeState] = useState(props.post.likes)
    const [dislikeState, setDislikeState] = useState(props.post.dislikes)
    const [deleted, setDeleted] = useState(false)
    const {user} = useContext(AuthContext);



    //33-64 : Determiner le temps qui a passe depuis le moment du publication de poste et le temps actuel
    const d1 = Date.now();
    const d2 = new Date(props.date);
    var diff= Math.abs(d1-d2);
    var date = 0;
    var dateStr = "";
    if (diff >= (1000*3600*24*365)){
        date = diff/(1000 * 3600 * 24 * 365)
        dateStr = Math.floor(date).toString() + " y"
    } else {
        if(diff >= (1000*3600*24*30)){
            date = diff/(1000*3600*24*30)
            dateStr = Math.floor(date).toString() + " m"
        } else{
            if(diff >= (1000*3600*24)){
                date = diff/(1000*3600*24)
                dateStr = Math.floor(date).toString() + " d"
            } else {
                if(diff >= (1000*3600)){
                    date = diff/(1000*3600)
                    dateStr = Math.floor(date).toString() + " h"
                } else{
                    if(diff >= (1000*60)){
                        date = diff/(1000*60)
                        dateStr = Math.floor(date).toString() + " min"
                    } else {
                        date = diff/(1000)
                        dateStr = Math.floor(date).toString() + " s"
                    }
                }
            }
        }
    }

    //Envoyer les commentaires chacune a sa composante avec ses "props"
    const comments = props.comments.map(x=>
        <Comment 
            key={x.id}
            id={props.id}
            userId={x.userId}
            content={x.content}
            vote={x.vote}
            date={x.date}
            likes={x.likes}
            dislikes={x.dislikes}
            comments={props.comments}
            comment={x}
            post={props.post}
        />
    )
    
    //Detetmine le nom d'utilisateur depuis son idetifiant
    function userName(thisId) {
        for (let i=0;i<users.length;i++){
            if(users[i]._id==thisId){
                return(users[i].username)
            }
        }
    }
    //Detetmine la photo de profil d'utilisateur depuis son idetifiant
    function userImg(thisId) {
        for (let i=0;i<users.length;i++){
            if(users[i]._id==thisId){
                return(users[i].picture)
            }
        }
    }

    //Amener tous les utilisateurs
    useEffect(() => {
        const fetchUsers = async () => {
        const res = await axios.get("http://localhost:5000/api/user/allusers");
        setUsers(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
        );
        };
        fetchUsers();
    }, []);

    const isLiked = likeState.includes(user.username) //Etat de boutton de "like"
    const isDisliked = dislikeState.includes(user.username) //Etat de boutton de "dislike"
    //Clique sur le button de "like" declenche ce code ci-dessous
    const upvote = async () => {
        if(!isDisliked){
            if(!isLiked) {
                setVote(prevVote=>prevVote+1);
                setRoomers(prevRoomer=>prevRoomer+1);
                let likes=likeState;
                console.log(likes)
                setLikeState(prev=>{
                    prev.push(user.username)
                    return prev
                })
                likes.push(user.username)
                console.log(likes)
                await axios.put("http://localhost:5000/api/posts/" + props.id,{...props.post, likes:likes, dislikes:dislikeState} );
                //Envoyer dans le "backend" une publication dans laquelles l'etat de "like" sont modifees

            }else{
                setVote(prevVote=>prevVote-1);
                setRoomers(prevRoomer=>prevRoomer-1);
                let likes=likeState;
                setLikeState(prev=>{
                    const list = prev.filter((item)=> {
                        return item !== user.username
                    })
                    return list
                })
                console.log(likes)
                likes=likes.filter((item) =>{
                    return item !== user.username
                })
                console.log(likes)
                await axios.put("http://localhost:5000/api/posts/" + props.id,{...props.post, likes:likes, dislikes:dislikeState} );
                //Envoyer dans le "backend" une publication dans laquelles l'etat de "like" sont modifees

            }
        }else{
            setVote(prevVote=>prevVote+2)
            const likes=likeState
                setLikeState(prev=>{
                    prev.push(user.username)
                    return prev
                })
                likes.push(user.username)
            let dislikes=dislikeState;
                setDislikeState(prev=>{
                    const list = prev.filter(function(item) {
                        return item !== user.username
                    })
                    return list
                })
                dislikes= dislikes.filter(function(item) {
                    return item !== user.username
                })
            await axios.put("http://localhost:5000/api/posts/" + props.id,{...props.post, likes:likes,dislikes:dislikes} );
            //Envoyer dans le "backend" une publication dans laquelles l'etat de "like" sont modifees
          
        }
    }
    const downvote = async () => {
        if(!isLiked){
            if(!isDisliked) {
                setVote(prevVote=>prevVote-1);
                setRoomers(prevRoomer=>prevRoomer+1);
                const dislikes=dislikeState
                setDislikeState(prev=>{
                    prev.push(user.username)
                    return prev
                })
                dislikes.push(user.username)
                await axios.put("http://localhost:5000/api/posts/" + props.id,{...props.post, dislikes:dislikes, likes:likeState} );
                //Envoyer dans le "backend" une publication dans laquelles l'etat de "like" sont modifees

            }else{
                setVote(prevVote=>prevVote+1);
                setRoomers(prevRoomer=>prevRoomer-1);
                let dislikes=dislikeState;
                setDislikeState(prev=>{
                    const list = prev.filter(function(item) {
                        return item !== user.username
                    })
                    return list
                })
                dislikes=dislikes.filter(function(item) {
                    return item !== user.username
                })
                await axios.put("http://localhost:5000/api/posts/" + props.id,{...props.post, dislikes:dislikes, likes:likeState} );
                //Envoyer dans le "backend" une publication dans laquelles l'etat de "like" sont modifees
            }
        }else{
            setVote(prevVote=>prevVote-2)
            let dislikes=dislikeState
            setDislikeState(prev=>{
                prev.push(user.username)
                return prev
            })
            dislikes.push(user.username)
        let likes=likeState;
            setLikeState(prev=>{
                const list = prev.filter(function(item) {
                    return item !== user.username
                })
                return list
            })
            likes=likes.filter(function(item) {
                return item !== user.username
            })
        await axios.put("http://localhost:5000/api/posts/" + props.id,{...props.post, likes:likes,dislikes:dislikes} );
        //Envoyer dans le "backend" une publication dans laquelles l'etat de "like" sont modifees
        }
    }
    function handlecomment() {
        // setComment(prevComment=>!prevComment)
        setComment(true)
    }


    function handleDropwdown() {
        setEditClicked(prev=>!prev);
        if(editClicked){
            setStyle(showStyle) //Changer la valeur de "state" pour afficher le code
        }else{
            setStyle(hideStyle) //Changer la valeur de "state" pour cacher le code
        }
    }
    function handleEditTrue() {
        setIsEdit(true) //Activer le mode de modification de texte de la pubication
        setStyle(hideStyle) //Changer la valeur de "state" pour afficher le code
    }
    function handleEditFalse() {
        setIsEdit(false) //Desactiver le mode de modification de texte de la pubication
    }
    function handleChange(event) {
        setDescValue(event.target.value) //Rendre la valeur de "input" incontrolle
    }
    const handleCheck = async () => {
        setDescription(descValue)
        setIsEdit(false)
        //Definir une liste constitues des elements precedents sauf de changement de la valeur de texte du commentaire
        await axios.put(
            `http://localhost:5000/api/posts/${props.id}`,
            {...props.post, desc: descValue}
        );
    }

    const handleDeletePost = async () => {
        await axios.delete(`http://localhost:5000/api/posts/${props.id}`, {data:{userId:user._id}})
        //Envoyer dans le "backend" une publication dans laquelles les commentaires sont modifees
        setDeleted(!deleted);
    }
    if(!deleted){
    return(
          <div className="post">
            <div className="post-grid">

                <img className="profileimage" src={"http://localhost:5000/images/" + userImg(props.userId)} />

                <div className="post-room-name">
                    <h5><b>{props.room} -</b> <small>{userName(props.userId)}</small></h5>
                    <p><small>{dateStr}</small></p>
                </div>
                {user._id === props.userId && 
                    <div className="post-edit">
                        <button onClick={handleDropwdown} className="dots-button"><BsThreeDots /></button>
                        <div style={style} className="post-edit-buttons">
                            <AiFillEdit style={{cursor: "pointer"}} onClick={handleEditTrue}/>
                            <AiFillDelete style={{cursor: "pointer"}} onClick={handleDeletePost}/>
                        </div>
                    </div>
                }
            </div>
            <div className="post-desc">
                {isEdit && (
                    <div className="edit-desc">
                        <textarea
                            className="edit-description" 
                            value={descValue} 
                            onChange={(event)=>handleChange(event)}
                        />
                        <AiOutlineClose onClick={handleEditFalse} className="post-like"/>
                        <AiOutlineCheck onClick={handleCheck} className="post-like"/>
                    </div>
                )}
                {!isEdit && <p className="description-content">{description}</p>}
            </div>
            <div>
                {props.img && <img src={"http://localhost:5000/images/" + props.img} width="100%" />}
            </div>
            <div className="post-interact">
                <div className="post-rating">
                    {vote >=0 
                        ? <AiFillLike className="post-like"/>
                        : <AiFillDislike className="post-like" />
                    }
                    <small>{roomers} Roomers</small>
                    <small>{props.comments.length} comments</small>
                </div>
                <div className="post-rate">
                    <div>
                        {isLiked
                            ? <AiFillLike onClick={()=>upvote()} className="post-like"/>
                            : <AiOutlineLike onClick={()=>upvote()} className="post-like"/>
                        }
                        <small>{vote}</small>
                        {isDisliked
                            ? <AiFillDislike onClick={()=>downvote()} className="post-like"/>
                            : <AiOutlineDislike onClick={()=>downvote()} className="post-like"/>
                        }
                    </div>
                    <div onClick={handlecomment}>
                        <div style={{cursor: "pointer"}} className="hover-background">
                            <BiComment />
                            <small className="hidable" style={{marginLeft:"5px"}}> comments</small>
                        </div>
                    </div>
                    <div className="hover-cursor">
                        <div className="hover-background">
                            <FiShare />
                            <small className="hidable" style={{marginLeft:"5px"}}>share</small>
                        </div>
                    </div>
                </div>
            </div>
            {comment && 
              <div className="comment">
                <div className="comment-close"><AiOutlineClose className="hover-background" onClick={()=>handlecomment()} /></div>
                <AddComment post={props.post} comments={props.comments}/>
                {props.comments.length!=0 && 
                    comments
                }
              </div>
            }
        </div>
    )
        } else{
            return null
        }
}   