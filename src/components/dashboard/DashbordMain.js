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
  const data = [
    {
      name: "STR",
      Total: 4000,
      Close: 2400,
      amt: 2400,
    },
    {
      name: "FIN",
      Total: 3000,
      Close: 1398,
      amt: 2210,
    },
    {
      name: "QLT",
      Total: 2000,
      Close: 9800,
      amt: 2290,
    },
    {
      name: "MAN",
      Total: 2780,
      Close: 3908,
      amt: 2000,
    },
    {
      name: "STO",
      Total: 1890,
      Close: 4800,
      amt: 2181,
    },
    {
      name: "HR",
      Total: 2390,
      Close: 3800,
      amt: 2500,
    },
  ];

  const [dataa, setData] = useState([]);
  const [total, setTotal] = useState(8);

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
            <h3>Closed</h3>
            <h1>4</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-style"></div>
          <div className="card-inner">
            <h3>Running</h3>
            <h1>3</h1>
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
            <h1>8</h1>
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
            <Bar dataKey="Total" fill="#8884d8" />
            <Bar dataKey="Close" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default DashbordMain;
