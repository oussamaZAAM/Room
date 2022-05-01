import React, { useContext, useState } from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./Context/authContext";
import OtherProfile from "./components/OtherProfile"


export default function App() {
  const [userId,setUserId] = useState("62684b4f6310e9c80ab3f35a");
  console.log(userId)
  const {user} = useContext(AuthContext);

  function handleUserId(id) {
    setUserId(id)
  }

    return(
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={user ? <Feed /> : <Login />} />
          <Route path="/register" element={user ? <Feed /> : <Register />} />
          <Route path="/" element={user ? <Feed /> : <Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
          <Route path="/otherprofile" element={user ? <OtherProfile userId={userId} handleUserId={handleUserId} /> : <Login />} />
          {/* Hadchi ba9i mkhwer */}
          
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
    )
}
