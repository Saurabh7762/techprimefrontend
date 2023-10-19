import React, { useEffect, useState } from "react";
import "./CreatprojectMain.css";
import { ReactComponent as Logo } from "../image/Logocopy.svg";
import { useNavigate } from "react-router-dom";
function Main() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "Registered",
    reason: "",
    type: "",
    priority: "",
    division: "",
    category: "",
    dept: "",
    location: "",
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const isFormValid = () => {
    return (
      formData.name &&
      formData.reason &&
      formData.startDate &&
      formData.type &&
      formData.priority &&
      formData.division &&
      formData.category &&
      formData.dept &&
      formData.endDate &&
      formData.location
    );
  };

  async function handleFormSubmit(event) {

    event.preventDefault();

    // Convert the start and end dates to Date objects
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    if (!startDate || !endDate) {
      alert("Please enter valid start and end dates.");
    } else if (endDate < startDate) {
      alert("End date should not be smaller than the start date.");
    } else if (isFormValid()) {
      const response = await fetch(
        "https://techprimebackend.vercel.app/api/project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Project created successfully");
        navigate("/Projectlist");
      } else {
        alert("Error creating project");
      }
    } else {
      alert("Please fill in all required fields.");
    }
  }

  // for validation
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    reason: "",
    startDate: "",
    endDate: "",
    type: "",
    priority: "",
    division: "",
    category: "",
    dept: "",
    location: "",
  });

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        if (!value) {
          setErrorMessages((prevMessages) => ({
            ...prevMessages,
            name: "Project Theme required",
          }));
        } else {
          setErrorMessages((prevMessages) => ({
            ...prevMessages,
            name: "",
          }));
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
      validateField(name, value);

  };

  //for current date
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update the date every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: formatDate(currentDate),
    }));

  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
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
              className={`Creatprojectmaintextarea ${
                errorMessages.name && "invalid-input"
              }`}
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
          {errorMessages.name && (
            <p className="invalid-label invalid-labeltext">
              {errorMessages.name}
            </p>
          )}
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
                <option value="">Select Reason</option>
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
                <option value="">Select Category</option>
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
                max={formData.endDate} // Set the maximum date to the end date
                onChange={(e) => setFormData({ startDate: e.target.value })}
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
                <option value="">Select Type</option>
                <option value="External">External</option>
                <option value="Vendor">Vendor</option>
                <option value="Internal">Internal</option>
              </select>
              <label htmlFor="Priority">Priority</label>
              <select
                id="Priority"
                className="Creatprojectformfild"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="">Select Priority</option>
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
                min={formData.startDate} // Set the minimum date to the start date
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
                <option value="">Select Division</option>
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
                <option value="">Select Department</option>
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
                <option value="">Select Location</option>
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
