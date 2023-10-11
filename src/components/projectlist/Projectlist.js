import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../image/Logocopy.svg";

function Main() {
    const [data, setData] = useState([]); 

    useEffect(() => {
      const apiUrl = "https://techprimebackend-gnyo.onrender.com/api/project"; 

      fetch(apiUrl)
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => setData(data)) // Update the data state with the fetched data
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

  
  return (
    <main className="CreatprojectMain-container">
      <div className="CreatprojectMain-title">
        <div>
          <Logo />
        </div>
      </div>

      <div className="ProjectlistMain-cards">
          <div className="Projectlisttable">
            <table>
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
                {data.map((item, i) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </main>
  );
}

export default Main;
