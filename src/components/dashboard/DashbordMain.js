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

  const [totalIds, setTotalIds] = useState(0);
  const [totalClosedIds, setTotalClosedIds] = useState(0);
  const [totalRuningIds, setTotalRuningIds] = useState(0);
  const [totalCancelIds, setTotalCancelIds] = useState(0);
  const[closerlIds, setTotalcloserIds] = useState(0);
  useEffect(() => {
    // Make an HTTP request to the API
    fetch("https://techprimebackend.vercel.app/api/project/stats")
      .then((response) => response.json())
      .then((data) => {
        setTotalIds(data.totalIds);
        setTotalClosedIds(data.totalClosedIds);
        setTotalRuningIds(data.totalRunningIds);
        setTotalCancelIds(data.totalCancelIds);
        setTotalcloserIds(data.closerIds);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
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
            <h2 >Dashboard</h2>
            <div className="main-title">
              <div>
                <Logo className="logo" />
              </div>
            </div>
          </div>

          <div className="main-cards">
            <div className="card">
              <div className="card-style"></div>
              <div className="card-inner">
                <p>Total</p>
                <h1>{totalIds}</h1>
              </div>
            </div>
            <div className="card">
              <div className="card-style"></div>
              <div className="card-inner">
                <p>Closed</p>
                <h1>{totalClosedIds}</h1>
              </div>
            </div>
            <div className="card">
              <div className="card-style"></div>
              <div className="card-inner">
                <p>Running</p>
                <h1>{totalRuningIds}</h1>
              </div>
            </div>
            <div className="card">
              <div className="card-style"></div>
              <div className="card-inner">
                <p>Closure Delay</p>
                <h1>{closerlIds}</h1>
              </div>
            </div>
            <div className="card">
              <div className="card-style"></div>
              <div className="card-inner">
                <p>Cancelled</p>
                <h1>{totalCancelIds}</h1>
              </div>
            </div>
          </div>
          <div>
            <h3 className="chartsHeading">Department wise - Total Vs Closed</h3>
          </div>
          <div className="charts">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{
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
