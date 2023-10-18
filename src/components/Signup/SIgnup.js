import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


function SIgnup() {
  const history = useNavigate();
  const [email, setEmail]=useState('');
  const [password, setPassword] =useState('');

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch(
      "https://techprimebackend.vercel.app/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.status === "ok") {
      history("/");
    }
  }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <br />
        <input type="submit" value="register" />
      </form>
    </div>
  );
}

export default SIgnup
