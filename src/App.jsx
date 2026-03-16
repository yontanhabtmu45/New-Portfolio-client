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
import AdminsPage from "./markup/pages/Admin/AdminsPage";
import Projects from "./markup/pages/Admin/Projects";
import AddProject from "./markup/pages/Admin/AddProject";
import Skills from "./markup/pages/Admin/Skills";
import AddSkill from "./markup/pages/Admin/AddSkill";
import AddAdmin from "./markup/pages/Admin/AddAdmin";
import Login from "./markup/components/Login/Login";
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";

function App() {

  return (
    <ThemeProviderWrapper>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/about" element={<About/>}/> */}
        <Route path="/services" element={<Services/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login />} />

        {/* Protected admin routes (role-based) */}
        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={[1, 2]}>
              <DashboardPage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/admins"
          element={
            <PrivateAuthRoute roles={[1]}>
              <AdminsPage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-admin"
          element={
            <PrivateAuthRoute roles={[1]}>
              <AddAdmin />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <PrivateAuthRoute roles={[1, 2]}>
              <Projects />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-project"
          element={
            <PrivateAuthRoute roles={[1]}>
              <AddProject />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/skills"
          element={
            <PrivateAuthRoute roles={[1, 2]}>
              <Skills />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-skill"
          element={
            <PrivateAuthRoute roles={[1]}>
              <AddSkill />
            </PrivateAuthRoute>
          }
        />
      </Routes>
    </ThemeProviderWrapper>
  )
}

export default App
