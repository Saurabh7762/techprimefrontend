import Sidebar from "./Sidebar";
import Main from "./Main";

import "./Home.css";

function Home() {

  return (
    <div className="grid-container">
      <Sidebar/>
      <Main />
    </div>
  );
}

export default Home;
