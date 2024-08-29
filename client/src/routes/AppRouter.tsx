import { Routes, Route, Navigate } from "react-router-dom";
import WorkSpaceRouter from "./WorkSpaceRouter";
import AuthForm from "../components/auth/AuthForm/AuthForm";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/auth/*' element={<AuthForm />} />

      {/* main page routes */}
      <Route path='/*' element={<WorkSpaceRouter />} />
    </Routes>
  );
};

export default AppRouter;
