import React, { useState } from 'react'
import "./CreatprojectMain.css";
import { ReactComponent as Logo } from "../image/Logocopy.svg";


function Main() {
  const [formData, setFormData] = useState({
    name: '',
    startDate: null,
    endDate: "",
    status: "Registered",
    reason: "Business",
    type: "Internal",
    priority: "High",
    division: "Filters",
    category: "Quality A",
    dept: "Startegy",
    location: "Pune",
  });

  async function handleFormSubmit(event) {
    event.preventDefault();

    const response = await fetch(
      "https://techprimebackend-gnyo.onrender.com/api/project",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
        alert('Project created successfully');
        // Reset the form or navigate to another page if needed
    } else {
        alert('Error creating project');
    }
  };




  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  return (
    <main className="CreatprojectMain-container">
      <div className="CreatprojectMain-title">
        <div>
          <Logo className="logo" />
        </div>
      </div>

      <div className="CreatprojectMain-cards">
        <div className="CreatprojectMain-card">
          <div className="textareaandbtn">
            <textarea
              className="Creatprojectmaintextarea"
              placeholder="Enter Project Theme"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <button
              className="Creatprojectmainbtn Creatprojetfordesktop"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </div>
          <form className="projectform">
            <div className="Creatprojectform">
              <label htmlFor="Reason">Reason</label>
              <select
                id="Reason"
                className="Creatprojectformfild"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
              >
                <option value="Business">For Business</option>
                <option value="Dealership">For Dealership</option>
                <option value="Transport">For Transport</option>
              </select>
              <label htmlFor="Category">Category</label>
              <select
                id="Category"
                className="Creatprojectformfild"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Quality A">Quality A</option>
                <option value="Quality B">Quality B</option>
                <option value="Quality C">Quality C</option>
                <option value="Quality D">Quality D</option>
              </select>
              <label htmlFor="Start_Date">Start Date as per Project Plan</label>
              <input
                type="date"
                id="Start_Date"
                className="Creatprojectforminput"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Creatprojectform">
              <label htmlFor="Type">Type</label>
              <select
                id="Type"
                className="Creatprojectformfild"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Internal">Internal</option>
                <option value="External">External</option>
                <option value="Vendor">Vendor</option>
              </select>
              <label htmlFor="Priority">Priority</label>
              <select
                id="Priority"
                className="Creatprojectformfild"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <label htmlFor="End_Date">End Date as per Project Plan</label>
              <input
                type="date"
                id="End_Date"
                className="Creatprojectforminput"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
            <div className="Creatprojectform">
              <label htmlFor="Division">Division</label>
              <select
                id="Division"
                className="Creatprojectformfild"
                name="division"
                value={formData.division}
                onChange={handleChange}
              >
                <option value="Filters">Filters</option>
                <option value="Compressor">Compressor</option>
                <option value="Pumps">Pumps</option>
                <option value="Glass">Glass</option>
                <option value="Water Heater">Water Heater</option>
              </select>
              <label htmlFor="Department">Department</label>
              <select
                id="Department"
                className="Creatprojectformfild"
                name="dept"
                value={formData.dept}
                onChange={handleChange}
              >
                <option value="Startegy">Startegy</option>
                <option value="Finance">Finance</option>
                <option value="Quality">Quality</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Stores">Stores</option>
              </select>
              <label htmlFor="Location">Location</label>
              <select
                id="Location"
                className="Creatprojectformfild"
                name="location"
                value={formData.location}
                onChange={handleChange}
              >
                <option value="Pune">Pune</option>
                <option value="Ranchi">Ranchi</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
              </select>
              <div>
                <p>
                  Status:
                  <span className="CreatprojectformStatus">Registered</span>
                </p>
              </div>
              <div className="Creatprojectformobil">
                <button
                  className="Creatprojecjtmainbtn"
                  onClick={handleFormSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Main;
