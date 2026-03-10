import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'

// import Home from "./markup/pages/Home";
import Dashboard from "./markup/pages/Admin/Dashboard";
import AdminList from "./markup/components/Admin/AdminList/AdminList"

import privateAuthRoute from "./markup/components/Auth/PrivateAuthRoute"

function App() {

  return (
    <Routes>
      {/* <Route path="/" element={<Home/>}/> */}
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/admin" element={<Dashboard/>}/>
      <Route path="/admin/admins" element={<AdminList/>} />
    </Routes>
  )
}

export default App
