import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../image/Logocopy.svg";
import { filterData } from "./dataUtils"; 
import "./Projectlist.css"

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

    //----


    //active btn
    const getStatusClass = (status, currentStatus) => {
      if (status === currentStatus) {
        return "active-button";
      }
      return "";
    };
    //-----
  const [cuurrentPage, setcurrentPage]= useState(1)
  const recordsPerPage=7;
  const lastIndex=cuurrentPage * recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);
  const npage=Math.ceil(data.length/recordsPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1);


  return (
    <main className="CreatprojectMain-container">
      <div className="CreatprojectMain-title">
        <div>
          <Logo className="logo" />
        </div>
      </div>

      <div className="ProjectlistMain-cards">
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
            <div>
              <span>Sort By: </span>
              <select
                id="SortBy"
                name="SortBy"
                value={sortPriority}
                onChange={(e) => setSortPriority(e.target.value)}
              >
                <option value="">Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
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
                      to
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

          {/* tbale for mobile */}
          <table className="table formobile">
            <tbody>
              {records.map((item, i) => (
                <tr className="formobiledesign" key={i}>
                  <th>Project Name</th>
                  <td>
                    {item.name}
                    <p className="dateanddate">
                      {item.startDate != null
                        ? new Date(item.startDate).toLocaleDateString()
                        : "null"}{" "}
                      to
                      {item.endDate != null
                        ? new Date(item.endDate).toLocaleDateString()
                        : "null"}
                    </p>
                  </td>
                  <th>Reason</th>
                  <td>{item.reason}</td>
                  <th>Type</th>
                  <td>{item.type}</td>
                  <th>Divisions</th>
                  <td>{item.division}</td>
                  <th>Category</th>
                  <td>{item.category}</td>
                  <th>Priority</th>
                  <td>{item.priority}</td>
                  <th>Dept.</th>
                  <td>{item.dept}</td>
                  <th>Location</th>
                  <td>{item.location}</td>
                  <th>Status</th>
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
      </div>
    </main>
  );
  function prePage(){
    if(cuurrentPage !== 1){
      setcurrentPage(cuurrentPage -1)
    }

  }
  function changeCPage(id){
    setcurrentPage(id)

  }
  function nextPage(){
    if(cuurrentPage !== npage){
      setcurrentPage(cuurrentPage+1)
    }

  }
}

export default Main;
