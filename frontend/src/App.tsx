import { useState } from "react";

import "./App.css";
import Header from "./components/Header/index";
import Sidebar from "./components/Sidebar/index";
import WorkSpace from "./components/WorkSpace/WorkSpace";

function App() {
  const data = {
    user_id: "583c3ac3f38e84297c002546",
    email: "test@test.com",
    name: "Danil",
    folders: {
      Eng: {
        Verbs: ["to do", "to be", "to go", "to find"],
        adjectives: ["hot", "cold", "beautiful"],
      },
      Datch: {},
    },
  };

  return (
    <div className='App'>
      <div className='app-wrapper'>
        <Header />
        <div className='main-page-wrapper'>
          <Sidebar />
          <WorkSpace />
        </div>
      </div>
    </div>
  );
}

export default App;
