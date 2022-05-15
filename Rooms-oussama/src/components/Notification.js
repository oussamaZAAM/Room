import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/authContext";

const [notes, setNotes] = useState([]);
const { user } = useContext(AuthContext);

export default function Notification() {
    useEffect(() => {
        const fetchPosts = async () => {
          const res = await axios.get("http://localhost:5000/api/posts/profile1/" + user._id);
          setNotes(
            res.data.sort((p1, p2) => {
              return new Date(p2.date) - new Date(p1.date);
            })
          );
        };
        fetchPosts();
      }, [user._id]);
    return(
        <div className="notification-body">
            <img className="notificationimage" alt="Notification profile" src="https://i.ibb.co/J25RQCT/profile.png" />
            <div className="notification-text">
                <p><b>User 1</b> has liked your Post</p>
                <small>18 min ago</small>
            </div>
        </div>
    )
}