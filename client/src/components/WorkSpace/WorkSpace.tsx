import styles from "./WorkSpace.module.css";
import Folders from "./Folders/Folders";
import { Navigate, Route, Routes } from "react-router-dom";
import Modules from "./StudyModules/Modules";
import Terms from "./Terms/Terms";
import { ContextMenuProvider } from "../../context";
import NotFoundPage from "./NotFoundPage";

const WorkSpace = () => {
  return (
    <div className={styles.workspace}>
      <ContextMenuProvider>
        <Routes>
          <Route path='/folders' element={<Folders />} />
          <Route path='/folders/:folderId/modules' element={<Modules />} />
          <Route
            path='/folders/:folderId/modules/:moduleId'
            element={<Terms />}
          />

          {/* For all non-existent routes */}
          <Route path='*' element={<Navigate to='/404' replace />} />
          <Route path='/404' element={<NotFoundPage />} />
        </Routes>
      </ContextMenuProvider>
    </div>
  );
};

export default WorkSpace;
