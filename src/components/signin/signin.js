import "./Style.css";
import { ReactComponent as ReactLogo } from "../image/loginbg1.svg";
import { ReactComponent as Logo } from "../image/Logo.svg";
import { useState } from "react";


function Signin() {
  const [email, setEmail]=useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");


  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch(
      "https://techprimebackend.vercel.app/api/login",
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

    if (data.user) {
      localStorage.setItem("token", data.user);
      window.location.href = "/Dashbord";
    } else {
      setError("Invalid credentials");
    }
  }



  return (
    <>
      <div className="signinbackground">
        <ReactLogo className="signinback" />
        <div className="signinbacgroundstye">
          <Logo className="signinlogo"/>
          <span className="signinfirstp">Online Project Management</span>
          <div className="signinlogin-container">
            <p className="signincardtital">Login to get started</p>
            <form action="post" onSubmit={loginUser}>
              <div className="signinform-group">
                <label htmlFor="username">Email</label>
                <input
                  type="email"
                  id="username"
                  name="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="signinform-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="signinerrorandforget">
                  {/* <p className="error">Invalid credentials</p> */}
                  <p className="signinforgetpassword">Forget password?</p>
                </div>
              </div>
              <div className="signinform-group">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
          <p className="error">{error}</p>
        </div>
      </div>
    </>
  );
}
export default Signin;
