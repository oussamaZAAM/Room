import React, { useContext } from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./Context/authContext";


export default function App() {
  const {user} = useContext(AuthContext);


    return(
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={user ? <Feed /> : <Login />} />
          <Route path="/register" element={user ? <Feed /> : <Register />} />
          <Route path="/" element={user ? <Feed /> : <Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
    )
}
