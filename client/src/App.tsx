import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Layout/Header/index";
import Sidebar from "./components/Layout/Sidebar/index";
import WorkSpace from "./components/Dashboard/WorkSpaceRouter";

import { useAppDispatch, useAppSelector } from "./Hooks";
import { fetchData } from "./store/dataSlice";
import { BrowserRouter } from "react-router-dom";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
    setIsLoading(false);
  }, [dispatch]);

  return (
    <div className='App'>
      <div className='app-wrapper'>
        <BrowserRouter>
          <Header />
          <div className='main-page-wrapper'>
            <Sidebar />
            <WorkSpace />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
