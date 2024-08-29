import { useEffect, useState } from "react";
import "./App.css";

import { useAppDispatch, useAppSelector } from "./Hooks";
import { fetchData } from "./store/dataSlice";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
    setIsLoading(false);
  }, [dispatch]);

  return (
    <div className='App'>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
