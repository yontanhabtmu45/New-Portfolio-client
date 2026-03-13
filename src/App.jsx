import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'
import ThemeProviderWrapper from './ThemeContext';

import Home from "./markup/pages/Home";
// import About from "./markup/pages/About";
import Services from "./markup/pages/Services";
import Portfolio from "./markup/pages/Portfolio";
import Contact from "./markup/pages/Contact";
import DashboardPage from "./markup/pages/Admin/DashboardPage";
import AdminsPage from "./markup/pages/Admin/AdminsPage"

import privateAuthRoute from "./markup/components/Auth/PrivateAuthRoute"
import Projects from "./markup/pages/Admin/Projects";
import AddProject from "./markup/pages/Admin/AddProject";
import Skills from "./markup/pages/Admin/Skills";
import AddSkill from "./markup/pages/Admin/AddSkill";
import AddAdmin from "./markup/pages/Admin/AddAdmin";

function App() {

  return (
    <ThemeProviderWrapper>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/about" element={<About/>}/> */}
        <Route path="/services" element={<Services/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/admin" element={<DashboardPage/>}/>
        <Route path="/admin/admins" element={<AdminsPage/>} />
        <Route path="/admin/add-admin" element={<AddAdmin/>} />
        <Route path="/admin/projects" element={<Projects/>} />
        <Route path="/admin/add-project" element={<AddProject/>} />
        <Route path="/admin/skills" element={<Skills/>} />
        <Route path="/admin/add-skill" element={<AddSkill/>} />
      </Routes>
    </ThemeProviderWrapper>
  )
}

export default App
