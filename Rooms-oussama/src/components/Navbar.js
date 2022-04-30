import React, { useContext } from "react";
import logo from "../images/logo.png"
import profileimage from "../images/profile.png"
import { AiFillMessage } from "react-icons/ai";
import { MdNotificationsActive } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

export default function Navbar() {
  const {user, isFetching, error, dispatch} = useContext(AuthContext)
  function handleLogout() {
    dispatch({ type: "LOGIN_SUCCESS", payload: null});
    localStorage.removeItem("user")
  }
  return(
        <div className="navbar">
            <ul className="navbar-list">
                <Link to="../">
                  <li className="navbar-li">
                    <img className="navbar-logo" src={logo} />
                  </li>
                </Link>
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
                    <Link to="../Profile">
                      <div className="navbar-user">
                        <img className="profileimage" src={profileimage} />
                        <p>{user.username}</p>
                      </div>
                    </Link>
                </li>
                <button onClick={handleLogout}>Log Out</button>
            </ul>
        </div>
  )
} 