import React from "react";
import { Link } from "react-router";


function Dashboard() {
  return (
    <section className="container-fluid main-dashboard">
      <div className="row px-2 admin-pages">
        <div className="col-md- admin-right-side">
            <section className="services-section">
              <div className="admin-dashboard">
                <h2>Admin Dashboard</h2>
                <p>
                  Welcome to the admin dashboard. Here you can manage all
                  aspects of the application.
                </p>
                <div className="admin-links">
                  <Link to="/admin/project" className="btn btn-primary">
                    Manage project
                  </Link>
                  <Link to="/admin/add-project" className="btn btn-success">
                    Add project
                  </Link>
                  <Link to="/admin/skills" className="btn btn-success">
                  {/* <span className="dashboard-icon"><FaWarehouse /></span> */}
                    Manage skills
                  </Link>
                  <Link to="/admin/add-skill" className="btn btn-primary">
                    Add Skill
                  </Link>
                  <Link to="/admin/admins" className="btn btn-secondary">
                    Manage Admins
                  </Link>
                  <Link to="/admin/add-admin" className="btn btn-secondary">
                    Add Admin
                  </Link>
                </div>
              </div>
            </section>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
