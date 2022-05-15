import React from "react";

export default function Notification() {
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