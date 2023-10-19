import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signin from './components/signin/signin';
import Home from "./components/dashboard/DashbordHome";
import CreatprojectHome from './components/creatproject/CreatprojectHome';
import SIgnup from './components/Signup/SIgnup';
import Projectlisthome from './components/projectlist/Projectlisthome'


function App() {
  const userToken = localStorage.getItem("token");
  console.log(userToken);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={userToken ? <Navigate to="/Dashbord" /> : <Signin />}
          />
          <Route path="/signup" element={<SIgnup />} />
          <Route
            path="/Dashbord"
            element={userToken ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/CreatProject"
            element={userToken ? <CreatprojectHome /> : <Navigate to="/" />}
          />
          <Route
            path="/Projectlist"
            element={userToken ? <Projectlisthome /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
