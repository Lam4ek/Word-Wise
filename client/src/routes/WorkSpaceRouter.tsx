import styles from "../components/Dashboard/Dashboard.module.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Terms from "../components/Dashboard/Terms";
import { ContextMenuProvider } from "../context";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Cards from "../components/Dashboard/QuizStation/FlashCards";
import Memorization from "../components/Dashboard/QuizStation/Memorization";
import Test from "../components/Dashboard/QuizStation/StudyTest";
import Selection from "../components/Dashboard/QuizStation/Selection";
import Folders from "../components/Dashboard/Folders";
import Modules from "../components/Dashboard/StudyModules";
import Layout from "../components/Layout/Layout";

const WorkSpaceRouter = () => {
  return (
    <div className={styles.workspace}>
      <ContextMenuProvider>
        <Layout>
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
        </Layout>
      </ContextMenuProvider>
    </div>
  );
};

export default WorkSpaceRouter;
