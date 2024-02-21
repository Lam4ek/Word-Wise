import styles from "./WorkSpace.module.css";
import Folders from "./Folders/Folders";
import { Navigate, Route, Routes } from "react-router-dom";
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

          {/* For all non-existent routes */}
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Routes>
      </ContextMenuProvider>
    </div>
  );
};

export default WorkSpace;
