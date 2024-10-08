import { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../Hooks";
import { addFolder } from "../../../store/dataSlice";
import FolderList from "./components/FolderList";
import NotFoundPage from "../../../pages/NotFoundPage/NotFoundPage";
import styles from "../Dashboard.module.css";

const Folders: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const folders = useAppSelector((state) => state.userData.folders);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(!folders);
  }, [folders]);

  const handleNavigation = (folderId: string) => {
    navigate(`./${folderId}/modules`);
  };

  const handleAddFolder = () => {
    dispatch(addFolder());
  };

  if (!folders) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.container}>
      <h2 style={{ marginBottom: "10px" }}>Folders</h2>
      {!isLoading && folders ? (
        <FolderList
          folders={folders}
          handleNavigation={handleNavigation}
          handleAddFolder={handleAddFolder}
        />
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default Folders;
