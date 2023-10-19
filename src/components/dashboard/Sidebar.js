import React, { useEffect, useState } from 'react'
import "./Sidebar.css";
import { ReactComponent as Dash } from "../image/Dashboard.svg";
import { ReactComponent as Proj } from "../image/Projectlist.svg";
import { ReactComponent as AddProj } from "../image/createproject.svg";
import { ReactComponent as Logout } from "../image/Logout.svg";
import { Link } from 'react-router-dom';


function Sidebar() {
  const handleLogout = () => {
    // Clear the user's token from localStorage
    localStorage.removeItem("token");

    // Redirect to the signin page
    window.location.href = "/"; // Alternatively, you can use history.push('/signin') if you have access to React Router's history.
  };


  return (
    <aside id="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/Dashbord">
            {" "}
            <Dash />
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/Projectlist">
            {" "}
            <Proj />
          </Link>
        </li>
        <hr className="line" />
        <li className="sidebar-list-item">
          <Link to="/CreatProject">
            {" "}
            <AddProj />
          </Link>
        </li>
        <div className="logout">
          <li className="sidebar-list-item">
            <div onClick={handleLogout}>
              <Logout />
            </div>
          </li>
        </div>
      </ul>
    </aside>
  );
}

export default Sidebar;
