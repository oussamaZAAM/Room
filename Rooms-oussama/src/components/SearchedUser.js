import React from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import { Link } from "react-router-dom";

export default function SearchedUser(props) {
    //Affiche les utlisateurs trouve avec le meme nom recherche
    return(
        <div >
            <div className="searched-user">
                <Link to={"../"+props.id}><img src={"http://localhost:5000/images/"+props.image} className="searchimage" /></Link>
                <div className="user-propreties">
                    <Link to={"../"+props.id} className="link-username"><b className="searched-username">{props.username}</b></Link>
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