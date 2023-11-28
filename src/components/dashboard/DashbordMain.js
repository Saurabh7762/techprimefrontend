import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";


import React, { useEffect, useState } from 'react'
import "./DashbordMain.css";
import { ReactComponent as Logo } from "../image/Logocopy.svg";
import  back  from "../image/Headerbg.svg";



function DashbordMain() {

  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a GET request to the API to fetch the data
    fetch("https://techprimebackend.vercel.app/api/department-data")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [projectStats, setProjectStats] = useState([]);
  useEffect(() => {
    // Make an HTTP request to the API
    fetch("https://techprimebackend.vercel.app/api/project/stats")
      .then((response) => response.json())
      .then((data) => setProjectStats(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

    const desiredOrder = [
      "Total",
      "Closed",
      "Running",
      "Closure Delay",
      "Cancel",
    ];


  function CustomXAxisTick({ x, y, payload }) {
    const categoryMap = {
      Startegy: "STR",
      Finance: "FIN",
      Quality: "QUA",
      Maintenance: "MAI",
      Stores: "STO",
      // Add more mappings as needed
    };
    const abbreviation = categoryMap[payload.value];
    const totalData = data.find((item) => item._id === payload.value).totalData;
    const totalClosed = data.find(
      (item) => item._id === payload.value
    ).totalClosed;
    const percentageData = ((totalClosed/totalData ) * 100).toFixed(0);


    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={16}
          dy={-2}
          textAnchor="middle"
          fill="#666"
          fontWeight="bold"
        >{`${percentageData}%`}</text>
        <text x={0} y={0} dy={30} textAnchor="middle" fill="#666">
          {abbreviation}
        </text>
      </g>
    );
  }
  


  return (
    <>
      <main className="main-container">
        <img className="back" src={back} alt="back" />
        <div className="main-container-main">
          <div className="main-container-header">
            <h2>Dashboard</h2>
            <div className="main-title">
              <div>
                <Logo className="logo" />
              </div>
            </div>
          </div>

          <div className="main-cards">
            {desiredOrder.map((status) => {
              const stat = projectStats.find((stat) => stat.status === status);
              return (
                <div className="card" key={status}>
                  <div className="card-style"></div>
                  <div className="card-inner">
                    <p>{status}</p>
                    <h1>{stat ? stat.count : 0}</h1>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h3 className="chartsHeading">Department wise - Total Vs Closed</h3>
          </div>
          <div className="charts">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{
                  top:5,
                  right: 30,
                }}
              >
                <XAxis height={60} tick={<CustomXAxisTick />} dataKey="_id" />
                <YAxis />
                <Legend iconType="circle" />
                <Bar
                  dataKey="totalData"
                  name="Total"
                  fill="#8884d8"
                  barSize={10}
                  radius={[10, 10, 10, 10]}
                  dot={{ r: 5 }}
                >
                  <LabelList dataKey="totalData" position="top" />
                </Bar>
                <Bar
                  dataKey="totalClosed"
                  name="Closed"
                  fill="#82ca9d"
                  barSize={10}
                  radius={[10, 10, 10, 10]}
                >
                  <LabelList dataKey="totalClosed" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </>
  );
}

export default DashbordMain;
