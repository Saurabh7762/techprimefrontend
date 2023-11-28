/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../image/Logocopy.svg";
import { filterData } from "./dataUtils";
import "./Projectlist.css";
import back from "../image/Headerbg.svg";

function Main() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortPriority, setSortPriority] = useState("");

  useEffect(() => {
    const apiUrl = "https://techprimebackend.vercel.app/api/project";

    fetch(apiUrl)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => setData(data)) // Update the data state with the fetched data
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //for search
  useEffect(() => {
    // Use the imported filterData function
    const filteredResults = filterData(data, searchTerm);
    const sortedData = sortData(filteredResults, sortPriority);
    setFilteredData(sortedData);
  }, [searchTerm, data, sortPriority]);

  //update status
  function handleStatusChange(newStatus, id) {
    // Make a PATCH request to update the project status
    fetch(`https://techprimebackend.vercel.app/api/project/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (response.status === 204) {
          // Status updated successfully
          alert("Update Successful!");
          // You can refresh the data here if needed
          return fetch("https://techprimebackend.vercel.app/api/project");
        } else {
          alert("Error updating project status");
        }
      })
      .then((response) => response.json())
      .then((updatedData) => {
        // Update the component state with the new data
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Error updating project status:", error);
      });
  }

  //------

  //sort deta
  /*
  const sortData = (data, priority) => {
    const customOrders = {
      High: ["High", "Medium", "Low"],
      Medium: ["Medium", "Low", "High"],
      Low: ["Low", "Medium", "High"],
    };

    if (priority in customOrders) {
      return data.sort((a, b) => {
        const order = customOrders[priority];
        return order.indexOf(a.priority) - order.indexOf(b.priority);
      });
    } else {
      // If the selected priority is not in customOrders, sort without custom order
      return data.sort((a, b) => (a.priority > b.priority ? 1 : -1));
    }
  };
  */

  const sortData = (data, sortBy) => {
    //for Reason
    if (sortBy === "Reason") {
      return data.sort((a, b) => {
        const order = {
          Business: 3,
          Dealership: 2,
          Transport: 1,
        };
        return order[a.reason] - order[b.reason];
      });
      // for Category
    } else if (sortBy === "Category") {
      return data.sort((a, b) => {
        const order = {
          "Quality A": 1,
          "Quality B": 2,
          "Quality C": 3,
          "Quality D": 4,
        };
        return order[a.category] - order[b.category];
      });
      //for Type
    } else if (sortBy === "Type") {
      return data.sort((a, b) => {
        const order = {
          External: 1,
          Vendor: 2,
          Internal: 3,
          Priority: 4,
        };
        return order[a.type] - order[b.type];
      });
      //for Priority
    } else if (sortBy === "Priority") {
      const customOrders = {
        High: 1,
        Medium: 2,
        Low: 3,
      };
      return data.sort(
        (a, b) => customOrders[a.priority] - customOrders[b.priority]
      );
      //for Division
    } else if (sortBy === "Division") {
      return data.sort((a, b) => a.division.localeCompare(b.division));
      // for Department
    } else if (sortBy === "Department") {
      return data.sort((a, b) => a.dept.localeCompare(b.dept));
      //for Location
    } else if (sortBy === "Location") {
      return data.sort((a, b) => a.location.localeCompare(b.location));
      //for starting Date
    } else if (sortBy === "StartDate") {
      return data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      //for End date
    } else if (sortBy === "EndDate") {
      return data.sort((a, b) => {
        const dateA = new Date(a.endDate);
        const dateB = new Date(b.endDate);
        const currentDate = new Date();

        const differenceA = dateA - currentDate;
        const differenceB = dateB - currentDate;

        if (
          (a.status === "Running" || a.status === "Registered") &&
          b.status !== "Running" &&
          b.status !== "Registered"
        ) {
          return -1; // "Running" and "Registered" statuses come before others
        } else if (
          a.status !== "Running" &&
          a.status !== "Registered" &&
          (b.status === "Running" || b.status === "Registered")
        ) {
          return 1; // "Running" and "Registered" statuses come before others
        } else if (differenceA < 0 && differenceB < 0) {
          // Both dates are in the past, so sort them in ascending order
          return differenceA - differenceB;
        } else if (differenceA >= 0 && differenceB >= 0) {
          // Both dates are in the future, so sort them in ascending order
          return differenceA - differenceB;
        } else {
          // One date is in the past, and the other is in the future
          // Sort the past date first, followed by the future date
          return differenceA - differenceB;
        }
      });
    } else {
      // Default case, no sorting
      return data;
    }
  };

  //----

  //active btn
  const getStatusClass = (status, currentStatus) => {
    if (status === currentStatus) {
      return "active-button";
    }
    return "";
  };
  //-----
  const [cuurrentPage, setcurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = cuurrentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <main className="main-container">
      <img className="back" src={back} alt="back" />
      <div className="main-container-main">
        <div className="main-container-header">
          <h2 className="creatprojecttital">Project Listing</h2>
          <div className="main-title">
            <div>
              <Logo className="logo" />
            </div>
          </div>
        </div>

        <div className="Projectlisttable">
          <div className="projectlisttop">
            <div>
              <input
                className="ProjectlistSinput"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="Sortedby">
              <span>Sort By: </span>
              <select
                id="SortBy"
                name="SortBy"
                value={sortPriority}
                onChange={(e) => setSortPriority(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Reason">Reason</option>
                <option value="Category">Category</option>
                <option value="Type">Type</option>
                <option value="Priority">Priority</option>
                <option value="Division">Division</option>
                <option value="Department">Department</option>
                <option value="Location">Location</option>
                <option value="StartDate">Start Date</option>
                <option value="EndDate">End Date</option>
              </select>
            </div>
          </div>
          <table className="table fordesktop">
            <thead>
              <th>Project Name</th>
              <th>Reason</th>
              <th>Type</th>
              <th>Divisions</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Dept.</th>
              <th>Location</th>
              <th>Status</th>
              <th></th>
              <th></th>
              <th></th>
            </thead>
            <tbody>
              {records.map((item, i) => (
                <tr key={i}>
                  <td>
                    {item.name}
                    <p className="dateanddate">
                      {item.startDate != null
                        ? new Date(item.startDate).toLocaleDateString()
                        : "null"}{" "}
                      to{" "}
                      {item.endDate != null
                        ? new Date(item.endDate).toLocaleDateString()
                        : "null"}
                    </p>
                  </td>
                  <td>{item.reason}</td>
                  <td>{item.type}</td>
                  <td>{item.division}</td>
                  <td>{item.category}</td>
                  <td>{item.priority}</td>
                  <td>{item.dept}</td>
                  <td>{item.location}</td>
                  <td>
                    <p className="projectlistStatus">{item.status}</p>
                  </td>
                  <td>
                    <button
                      className={`projectlistStatusbtn ${getStatusClass(
                        item.status,
                        "Running"
                      )}`}
                      onClick={() => handleStatusChange("Running", item._id)}
                    >
                      Start
                    </button>
                  </td>
                  <td>
                    <button
                      className={`projectlistStatusbtn ${getStatusClass(
                        item.status,
                        "Closed"
                      )}`}
                      onClick={() => handleStatusChange("Closed", item._id)}
                    >
                      Close
                    </button>
                  </td>
                  <td>
                    <button
                      className={`projectlistStatusbtn ${getStatusClass(
                        item.status,
                        "Cancel"
                      )}`}
                      onClick={() => handleStatusChange("Cancel", item._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* tbale for mobile */}
        <div className="table formobile">
          <div>
            {records.map((item, i) => (
              <div className="formobiledesign" key={i}>
                <div className="projtitalandstatus">
                  <div>
                    <h4 className="namemob">{item.name}</h4>
                    <p className="dateanddate">
                      {item.startDate != null
                        ? new Date(item.startDate).toLocaleDateString()
                        : "null"}{" "}
                      to{" "}
                      {item.endDate != null
                        ? new Date(item.endDate).toLocaleDateString()
                        : "null"}
                    </p>
                  </div>
                  <div>
                    <p className="projectlistStatus">{item.status}</p>
                  </div>
                </div>
                <li className="reasonmob">
                  <span>Reason: </span>
                  <span className="makeitboldmob">{item.reason}</span>
                </li>
                <li className="typemob">
                  <div>Type : </div>
                  <p className="typemobi makeitboldmob">{item.type}</p>
                  <li className="Categorymob">
                    <span className="spanCategorymob">Category: </span>
                    <span className="makeitboldmob">{item.category}</span>
                  </li>
                </li>
                <li className="typemob">
                  <div>Div : </div>
                  <p className="typemobi makeitboldmob">{item.division}</p>
                  <li className="Deptmob">
                    <span>Dept: </span>
                    <span className="makeitboldmob">{item.dept}</span>
                  </li>
                </li>
                <li className="Locationmob">
                  <span>Location: </span>
                  <span className="makeitboldmob">{item.location}</span>
                </li>
                <li className="Prioritymob">
                  <span>Priority: </span>
                  <span className="makeitboldmob">{item.priority}</span>
                </li>

                <div className="statusbtnmob">
                  <div className="mobbtnstyle">
                    <button
                      className={`projectlistStatusbtn ${getStatusClass(
                        item.status,
                        "Running"
                      )}`}
                      onClick={() => handleStatusChange("Running", item._id)}
                    >
                      Start
                    </button>
                  </div>
                  <div className="mobbtnstyle">
                    <button
                      className={`projectlistStatusbtn ${getStatusClass(
                        item.status,
                        "Closed"
                      )}`}
                      onClick={() => handleStatusChange("Closed", item._id)}
                    >
                      Close
                    </button>
                  </div>
                  <div className="mobbtnstyle">
                    <button
                      className={`projectlistStatusbtn ${getStatusClass(
                        item.status,
                        "Cancel"
                      )}`}
                      onClick={() => handleStatusChange("Cancel", item._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* _____________ */}
        <nav className="paginationNum">
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item ${cuurrentPage === n ? "active" : ""}`}
                key={1}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
  function prePage() {
    if (cuurrentPage !== 1) {
      setcurrentPage(cuurrentPage - 1);
    }
  }
  function changeCPage(id) {
    setcurrentPage(id);
  }
  function nextPage() {
    if (cuurrentPage !== npage) {
      setcurrentPage(cuurrentPage + 1);
    }
  }
}

export default Main;
