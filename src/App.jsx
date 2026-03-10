import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'

// import Home from "./markup/pages/Home";
import DashboardPage from "./markup/pages/Admin/DashboardPage";
import AdminsPage from "./markup/pages/Admin/AdminsPage"

import privateAuthRoute from "./markup/components/Auth/PrivateAuthRoute"

function App() {

  return (
    <Routes>
      {/* <Route path="/" element={<Home/>}/> */}
      <Route path="/admin" element={<DashboardPage/>}/>
      <Route path="/admin/admins" element={<AdminsPage/>} />
    </Routes>
  )
}

export default App
