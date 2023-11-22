import { useState, useEffect } from "react";
import styles from "./WorkSpace.module.css";
import Folders from "./Folder/Folders";
import { useAppSelector } from "../../Hooks";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Modules from "./TrainingModule/Modules";
import Terms from "./Term/Terms";

const WorkSpace = () => {
  const data = useAppSelector((state) => state.userData);
  console.log(data);

  return (
    <div className={styles.workspace}>
      <Routes>
        <Route path='/' element={<Folders data={data} />} />
        <Route path='/folder/:name' element={<Modules />} />
        <Route path='/folder/:name/module/:name' element={<Terms />} />
        {/* <Route
          path='/folder/:name/module/:name/program/:name'
          element={<Folders data={data} />}
        /> */}
      </Routes>
    </div>
  );
};

export default WorkSpace;
