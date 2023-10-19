import "./Style.css";
import { ReactComponent as ReactLogo } from "../image/loginbg1.svg";
import { ReactComponent as Logo } from "../image/Logo.svg";
import { useState } from "react";


function Signin() {
  const [email, setEmail]=useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  async function loginUser(event) {
    event.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
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
}


function validateEmail(email) {
  // You can add more complex email validation if needed
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    setEmailError("Email is required");
    return false;
  } else {
    setEmailError("");
    return true;
  }
}

function validatePassword(password) {
  // You can add more complex password validation if needed
  if (password.trim() === "") {
    setPasswordError("Password is required");
    return false;
  } else {
    setPasswordError("");
    return true;
  }
}  



  return (
    <>
      <div className="signinbackground">
        <ReactLogo className="signinback" />
        <div className="signinbacgroundstye">
          <Logo className="signinlogo" />
          <span className="signinfirstp">Online Project Management</span>
          <div className="signinlogin-container">
            <p className="signincardtital">Login to get started</p>
            <form action="post" onSubmit={loginUser}>
              <div className="signinform-group">
                <label
                  htmlFor="username"
                  className={` ${emailError ? "invalid-label" : ""}`}
                >
                  Email
                </label>
                <input
                  className={emailError ? "invalid-input" : ""}
                  type="email"
                  id="username"
                  name="username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  required
                />
                <p className="error">{emailError}</p>
              </div>
              <div className="signinform-group">
                <label
                  htmlFor="password"
                  className={` ${passwordError ? "invalid-label" : ""}`}
                >
                  Password
                </label>
                <input
                  className={passwordError ? "invalid-input" : ""}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  required
                />
                <div className="signinerrorandforget">
                  <p className="error">{passwordError}</p>
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
