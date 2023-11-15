import React from "react";
import "./App.css";
import Header from "./components/Header/index";
import Sidebar from "./components/Sidebar/index";
import WorkSpace from "./components/WorkSpace/WorkSpace";

function App() {
  return (
    <div className='App'>
      <div className='app-wrapper'>
        <Header />
        <div className='main-page_wrapper'>
          <Sidebar />
          <WorkSpace />
        </div>
      </div>
    </div>
  );
}

export default App;
