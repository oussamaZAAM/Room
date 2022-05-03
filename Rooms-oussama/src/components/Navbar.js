import React, { useContext, useState } from "react";
import logo from "../images/logo.png"
import { AiFillCloseSquare, AiFillMessage, AiOutlineClose } from "react-icons/ai";
import { MdNotificationsActive } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

export default function Navbar() {
  const [thisValue, setThisValue] = useState("");
  const {user, isFetching, error, dispatch} = useContext(AuthContext)
  const hideStyle = {
    display: "none"
  }
  const showStyle = {
    display: "block"
  }
  const [style, setStyle] = useState(hideStyle)
  function handleLogout() {
    dispatch({ type: "LOGIN_SUCCESS", payload: null});
    localStorage.removeItem("user")
  }
  function handleShow(e){
    setThisValue(e)
    if (e.length!=0){
      setStyle(showStyle)
    } else {
      setStyle(hideStyle)
    }
  }
  function handleClear() {
    setThisValue("")
    setStyle(hideStyle)
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
                    <Link to={"/search/"+thisValue}><BsSearch style={style} className="search-icon"/></Link>
                    <input onChange={(e)=>handleShow(e.target.value)} value={thisValue} className="navbar-search" placeholder="Search Rooms..." />
                    <AiOutlineClose style={style} className="search-icon" onClick={handleClear}/>
                </li>
                <li className="navbar-li"></li>
                <li className="navbar-li"></li>
                <li className="navbar-li">
                    <div className="navbar-notice">
                        <AiFillMessage />
                        <MdNotificationsActive />
                    </div>
                </li>
                <li className="dropdown">
                    <Link  className="navbar-username" to="../Profile">
                      <div className="navbar-link">
                        <img className="navbar-profileimage" src={"http://localhost:5000/images/" + user.picture} />
                        <p className="navbar-name">{user.username}</p>
                      </div>
                    </Link>
                    <button className="logout" onClick={handleLogout}>Log Out</button>
                </li>
            </ul>
        </div>
  )
} 