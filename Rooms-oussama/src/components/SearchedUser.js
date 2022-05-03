import React from "react";
import { MdAdd, MdRemove } from "react-icons/md";

export default function SearchedUser(props) {
    return(
        <div >
            <div className="searched-user">
                <img src={"http://localhost:5000/images/"+props.image} className="searchimage" />
                <div className="user-propreties">
                    <b className="searched-username">{props.username}</b>
                    <p>Friend</p>
                    <small>23 common friends</small>
                </div>
                <div className="searched-flex">
                    <MdAdd />
                    <MdRemove />
                    <h4>UnFollow</h4>
                </div>
            </div>
            <hr />
        </div>
    )
}