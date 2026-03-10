import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'

// import Home from "./markup/pages/Home";
import DashboardPage from "./markup/pages/Admin/DashboardPage";
import AdminsPage from "./markup/pages/Admin/AdminsPage"

import privateAuthRoute from "./markup/components/Auth/PrivateAuthRoute"
import Projects from "./markup/pages/Admin/Projects";
import AddProject from "./markup/pages/Admin/AddProject";
import Skills from "./markup/pages/Admin/Skills";
import AddSkill from "./markup/pages/Admin/AddSkill";

function App() {

  return (
    <Routes>
      {/* <Route path="/" element={<Home/>}/> */}
      <Route path="/admin" element={<DashboardPage/>}/>
      <Route path="/admin/admins" element={<AdminsPage/>} />
      <Route path="/admin/projects" element={<Projects/>} />
      <Route path="/admin/add-project" element={<AddProject/>} />
      <Route path="/admin/skills" element={<Skills/>} />
      <Route path="/admin/add-skill" element={<AddSkill/>} />
    </Routes>
  )
}

export default App
