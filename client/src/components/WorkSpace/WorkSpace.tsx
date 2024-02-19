import styles from "./WorkSpace.module.css";
import Folders from "./Folders/Folders";
import { Route, Routes } from "react-router-dom";
import Modules from "./StudyModules/Modules";
import Terms from "./Terms/Terms";
import { ContextMenuProvider } from "../../context";

const WorkSpace = () => {
  return (
    <div className={styles.workspace}>
      <ContextMenuProvider>
        <Routes>
          <Route path='/' element={<Folders />} />
          <Route path='/:folderName' element={<Modules />} />
          <Route path='/:folderName/:moduleName' element={<Terms />} />
          {/* <Route
          path='/folder/:name/module/:name/program/:name'
          element={<Folders data={data} />}
        /> */}
        </Routes>
      </ContextMenuProvider>
    </div>
  );
};

export default WorkSpace;
