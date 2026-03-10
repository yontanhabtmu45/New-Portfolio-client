import React from 'react';
import { Link } from 'react-router';

function AdminMenu() {
  return (
    <section>
      <div className="admin-menu">
        <h2>Admin Menu</h2>
      </div>
      <div className="list-group">
        <Link to="/admin" className="list-group-item">Dashboard</Link>
        <Link to="/admin/projects" className="list-group-item">Projects</Link>
        <Link to="/admin/add-project" className="list-group-item">New Projects</Link>
        <Link to="/admin/skills" className="list-group-item">Skills</Link>
        <Link to="/admin/add-skill" className="list-group-item">Add skills</Link>
        <Link to="/admin/admins" className="list-group-item">Admins</Link>
        <Link to="/admin/add-admin" className="list-group-item">Add admin</Link>
      </div>
    </section>
  );
}

export default AdminMenu;