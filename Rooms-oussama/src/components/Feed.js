import React, { useContext, useState, useEffect } from "react";
import {motion, AnimatePresence} from 'framer-motion'
import Navbar from "./Navbar";
import Post from "./Post";
// import { postCall } from "../apiCalls";
import axios from "axios"
import { AuthContext } from "../Context/authContext";
import AddPost from "./AddPost";

export default function Feed() {

  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  //Amener tous les publications du "backend"
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.date) - new Date(p1.date);
        })
      );
    };
    fetchPosts();
  }, [user._id]);
    //Envoyer les publications chacune a sa composante avec ses "props"
    const myPosts = posts.map(x=>{
        if(!Array.isArray(x)){
         
        return(
           <Post 
                key={x._id}
                id={x._id}
                desc={x.desc}
                img={x.photo}
                date={x.date}
                userId={x.userId}
                room={x.room}
                like={x.likes}
                disLike={x.dislikes}
                comments={x.comments}
                post={x}
                sharer={x.sharer}
                shareDesc={x.shareDesc}
                shareDate={x.shareDate}
                />
    )
} else{
  return (x.map(x=>{
    return (
    <Post 
                key={x._id}
                id={x._id}
                desc={x.desc}
                img={x.photo}
                date={x.date}
                userId={x.userId}
                room={x.room}
                like={x.likes}
                disLike={x.dislikes}
                comments={x.comments}
                post={x}
                />
    )
  }))
}})
    return(
        <>
            <Navbar />
            <AnimatePresence>
            <motion.dev initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <div className="feed">
                <AddPost /> 
                {myPosts.length!==0 && myPosts }
            </div>
            </motion.dev>
            </AnimatePresence>
        </>
    )
}