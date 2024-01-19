import { useState, useEffect } from "react";
import styles from "./WorkSpace.module.css";
import Folders from "./Folder/Folders";
import { useAppSelector } from "../../Hooks";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Modules from "./TrainingModule/Modules";
import Terms from "./Term/Terms";

const WorkSpace = () => {
  const [folderName, setFolderName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const data = useAppSelector((state) => state.userData);

  return (
    <div className={styles.workspace}>
      <Routes>
        <Route path='/' element={<Folders data={data} />} />
        <Route
          path='/:name'
          element={<Modules setFolderName={setFolderName} />}
        />
        <Route
          path='/:name/:name'
          element={<Terms folderName={folderName} />}
        />
        {/* <Route
          path='/folder/:name/module/:name/program/:name'
          element={<Folders data={data} />}
        /> */}
      </Routes>
    </div>
  );
};

export default WorkSpace;
