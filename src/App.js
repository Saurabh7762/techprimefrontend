import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from './components/signin/signin';
import Home from "./components/dashboard/DashbordHome";
import CreatprojectHome from './components/creatproject/CreatprojectHome';
import SIgnup from './components/Signup/SIgnup';
import Projectlisthome from './components/projectlist/Projectlisthome'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<SIgnup />} />
          <Route path="/Dashbord" element={<Home />} />
          <Route path="/CreatProject" element={<CreatprojectHome />} />
          <Route path="/Projectlist" element={<Projectlisthome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
