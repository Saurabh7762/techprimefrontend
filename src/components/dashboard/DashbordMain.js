import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React, { useEffect, useState } from 'react'
import "./DashbordMain.css";
import { ReactComponent as Logo } from "../image/Logocopy.svg";

function DashbordMain() {

  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a GET request to the API to fetch the data
    fetch("https://techprimebackend-gnyo.onrender.com/api/department-data")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [responseData, setResponseData] = useState([]);
  const [totalIds, setTotalIds] = useState(0);
  const [totalClosedIds, setTotalClosedIds] = useState(0);
  const [totalRuningIds, setTotalRuningIds] = useState(0);
  const [totalCancelIds, setTotalCancelIds] = useState(0);
  useEffect(() => {
    // Make an HTTP request to the API
    fetch("https://techprimebackend-gnyo.onrender.com/api/project")
      .then((response) => response.json())
      .then((json) => {
        setResponseData(json); // Store the API response in the state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Calculate the total number of "id" values
    if (responseData && Array.isArray(responseData)) {
      const ids = responseData.map((item) => item.id);
      const total = ids.length;
      setTotalIds(total);

      //for close
      const closedIds = responseData.filter((item) => item.status === "Closed");
      setTotalClosedIds(closedIds.length);

      //Running
      const runningIds = responseData.filter((item) => item.status === "Running");
      setTotalRuningIds(runningIds.length);

      //cancel
      const cancelIds = responseData.filter((item) => item.status === "Cancel");
      setTotalCancelIds(cancelIds.length);
    }
  }, [responseData]);

  return (
    <main className="main-container">
      <div className="main-title">
        <div>
          <Logo />
        </div>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-style"></div>
          <div className="card-inner">
            <h3>Total</h3>
            <h1>{totalIds}</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-style"></div>
          <div className="card-inner">
            <h3>Closed</h3>
            <h1>{totalClosedIds}</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-style"></div>
          <div className="card-inner">
            <h3>Running</h3>
            <h1>{totalRuningIds}</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-style"></div>
          <div className="card-inner">
            <h3>Closure Delay</h3>
            <h1>2</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-style"></div>
          <div className="card-inner">
            <h3>Cancelled</h3>
            <h1>{totalCancelIds}</h1>
          </div>
        </div>
      </div>
      <div className="charts">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 5,
              bottom: 5,
            }}
          >
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalData" fill="#8884d8" />
            <Bar dataKey="totalClosed" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default DashbordMain;
