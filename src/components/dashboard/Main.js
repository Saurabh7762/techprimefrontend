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
import "./Main.css";
import { ReactComponent as Logo } from "../image/Logocopy.svg";

function Main() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
  const [dataa, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
      // Fetch data from your API
      fetch("https://techprimebackend-gnyo.onrender.com/api/project") // Replace with your API endpoint
        .then((response) => response.json())
        .then((dataa) => {
          setData(dataa);

          // Calculate the total based on specific criteria
          const calculatedTotal = dataa
            .filter((item) => item.someCriteria === "yourCriteria") // Replace with your filtering criteria
            .reduce((acc, item) => acc + item.amount, 0); // Replace 'amount' with the field you want to sum

          setTotal(calculatedTotal);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);


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
            <h1>{total}</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-style"></div>
          <div className="card-inner">
            <h3>ALERTS</h3>
            <h1>42</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-style"></div>
          <div className="card-inner">
            <h3>ALERTS</h3>
            <h1>42</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-style"></div>
          <div className="card-inner">
            <h3>ALERTS</h3>
            <h1>42</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-style"></div>
          <div className="card-inner">
            <h3>ALERTS</h3>
            <h1>42</h1>
          </div>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 5,
              bottom: 5,
            }}
          >
            
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Main;
