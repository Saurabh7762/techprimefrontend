import { useLocation } from "react-router-dom";


import "./Sidebar.css";
import { ReactComponent as Dash } from "../image/Dashboard.svg";
import { ReactComponent as Proj } from "../image/Projectlist.svg";
import { ReactComponent as AddProj } from "../image/createproject.svg";
import { ReactComponent as Logout } from "../image/Logout.svg";
import { ReactComponent as Projsel } from "../image/Projectistactive.svg";
import { ReactComponent as Dashsel } from "../image/Dashboardactive.svg";
import { ReactComponent as AddProjsel } from "../image/createprojectactive.svg";


import { Link } from 'react-router-dom';


function Sidebar() {
  const location = useLocation();
  const handleLogout = () => {
    // Clear the user's token from localStorage
    localStorage.removeItem("token");

    // Redirect to the signin page
    window.location.href = "/"; // Alternatively, you can use history.push('/signin') if you have access to React Router's history.
  };
const isActive = (section) => {
  // Check if the section's path matches the current location
  return location.pathname === section;
};

  return (
    <aside id="sidebar">
      <ul className="sidebar-list">
        <div className="forboxde">
          <p className={`box ${isActive("/Dashbord") ? "selected" : ""}`}></p>
          <li className="sidebar-list-item">
            <Link to="/Dashbord">
              {" "}
              {isActive("/Dashbord") ? <Dashsel /> : <Dash />}
            </Link>
          </li>
        </div>
        <div className="forboxde projectli">
          <p
            className={`box ${isActive("/Projectlist") ? "selected" : ""}`}
          ></p>
          <li className="sidebar-list-item">
            <Link to="/Projectlist">
              {" "}
              {isActive("/Projectlist") ? <Projsel /> : <Proj />}
            </Link>
          </li>
        </div>
        <hr className="line" />
        <div className="forboxde addproject">
          <p
            className={`box ${isActive("/CreatProject") ? "selected" : ""}`}
          ></p>
          <li className="sidebar-list-item">
            <Link to="/CreatProject">
              {" "}
              {isActive("/CreatProject") ? <AddProjsel /> : <AddProj />}
            </Link>
          </li>
        </div>
        <div className="logout">
          <div className="forboxde">
            <p
              id="logoubox"
              className={`box ${isActive("/") ? "selected" : ""}`}
            ></p>
            <li className="sidebar-list-item">
              <div onClick={handleLogout}>
                <Logout />
              </div>
            </li>
          </div>
        </div>
      </ul>
    </aside>
  );
}

export default Sidebar;
