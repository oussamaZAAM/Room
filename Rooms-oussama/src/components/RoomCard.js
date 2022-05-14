import React from "react";
import dummy from "../images/post3.jpg"

export default function RoomCard(props) {
    return(
        <div className="room-card">
            <div>
                <img className="room-cursor room-card-img" src={props.img} />
            </div>
            <div className="room-card-text">
                <h3 className="room-cursor" style={{padding: "0px"}}>{props.title}</h3>
                <p style={{padding: "0px"}}>{props.roomers.length} Roomers</p>
            </div>
        </div>
    )
} 