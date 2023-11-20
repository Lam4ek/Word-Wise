import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header/index";
import Sidebar from "./components/Sidebar/index";
import WorkSpace from "./components/WorkSpace/WorkSpace";

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
          <div className='main-page_wrapper'>
            <Sidebar />
            <WorkSpace />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
