import styles from "./WorkSpace.module.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Terms from "./Terms/Terms";
import { ContextMenuProvider } from "../../context";
import NotFoundPage from "./NotFoundPage";
import Cards from "./StudyPrograms/FlashCards";
import Memorization from "./StudyPrograms/Memorization";
import Test from "./StudyPrograms/StudyTest";
import Selection from "./StudyPrograms/Selection";
import Folders from "./Folders";
import Modules from "./StudyModules";

const WorkSpaceRouter = () => {
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
          <Route
            path='/folders/:folderId/modules/:moduleId/flashcards'
            element={<Cards />}
          />

          <Route
            path='/folders/:folderId/modules/:moduleId/memorization'
            element={<Memorization />}
          />

          <Route
            path='/folders/:folderId/modules/:moduleId/test'
            element={<Test />}
          />

          <Route
            path='/folders/:folderId/modules/:moduleId/selection'
            element={<Selection />}
          />

          {/* For all non-existent routes */}
          <Route path='*' element={<Navigate to='/404' replace />} />
          <Route path='/404' element={<NotFoundPage />} />
        </Routes>
      </ContextMenuProvider>
    </div>
  );
};

export default WorkSpaceRouter;
