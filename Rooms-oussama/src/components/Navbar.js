import React from "react";
import logo from "../images/logo.png"
import profileimage from "../images/profile.png"
import { AiFillMessage } from "react-icons/ai";
import { MdNotificationsActive } from "react-icons/md";

export default function Navbar() {
    return(
        <div className="navbar">
            <ul className="navbar-list">
                <li className="navbar-li">
                    <img className="navbar-logo" src={logo} />
                </li>
                <li className="navbar-li">
                    <input className="navbar-search" placeholder="Search Rooms..." />
                </li>
                <li className="navbar-li">
                    <div className="navbar-notice">
                        <AiFillMessage />
                        <MdNotificationsActive />
                    </div>
                </li>
                <li className="navbar-li">
                    <div className="navbar-user">
                        <img className="profileimage" src={profileimage} />
                        <p>Username</p>
                    </div>
                </li>
            </ul>
        </div>
    )
} 