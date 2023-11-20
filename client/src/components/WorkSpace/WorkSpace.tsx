import { useState, useEffect } from "react";
import styles from "./WorkSpace.module.css";
import Folders from "./Pages/Folders";
import { useAppSelector } from "../../Hooks";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dictionaries from "./Pages/Dictionaries";

const WorkSpace = () => {
  const data = useAppSelector((state) => state.userData);
  console.log(data);

  return (
    <div className={styles.workspace}>
      <Routes>
        <Route path='/' element={<Folders data={data} />}></Route>
        <Route path='/folder/:name' element={<Dictionaries />} />
      </Routes>
    </div>
  );
};

export default WorkSpace;
