import Sidebar from "./Sidebar";
import DashbordMain from "./DashbordMain";

import "./DashbordHome.css";

function Home() {

  return (
    <div className="grid-container">
      <Sidebar />
      <DashbordMain />
    </div>
  );
}


export default Home;
