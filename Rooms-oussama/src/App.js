import React, { useContext } from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { AuthContext } from "./Context/authContext";
import OtherProfile from "./components/OtherProfile"
import Searching from "./components/Searching"
import PostPage from "./components/PostPage"


export default function App() {
  const {user} = useContext(AuthContext); //Prendre l'utilisateur connecte depuis le "Context"
  
  //Rediriger vers le profile si le "id" est egale a celui de l'utilisateur
  function HandleProfile() {
    let { id } = useParams();
    return (
      id === user._id 
        ? <Profile />
        : <OtherProfile userId={id} /> 
    )
  }
  //Afficher la page de recherche
  function HandleSearch() {
    let { id } = useParams();
    return (
      <Searching userId={id} /> 
    )
  }

  function HandlePost() {
    let { id } = useParams();
    return(
      <PostPage id={id} />
    )
  }

    return(
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={user ? <Feed /> : <Login />} />
          <Route path="/register" element={user ? <Feed /> : <Register />} />
          <Route path="/" element={user ? <Feed /> : <Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
          <Route path="/:id" element={user 
              ? <HandleProfile />
              : <Login />} />
          <Route path="/search/:id" element={user 
              ? <HandleSearch />
              : <Login />} />
          <Route path="/posts/:id" element={user
              ? <HandlePost />
              : <Login />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
    )
}
