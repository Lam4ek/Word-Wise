import { useEffect, useState } from "react";
import ModuleList from "./components/ModuleList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import NotFoundPage from "../../../pages/NotFoundPage/NotFoundPage";
import { addModule } from "../../../store/dataSlice";
import styles from "../Dashboard.module.css";
import { useModuleData } from "../../../Hooks/useModuleData";

function Modules() {
  const [isLoading, setIsLoading] = useState(true);
  const { folderId } = useParams<{ folderId: string }>();

  const { folder } = useModuleData();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (moduleId: string) => {
    navigate(`./${moduleId}`);
  };

  const handleAddModule = () => {
    dispatch(addModule({ folderId: folder.id }));
  };

  useEffect(() => {
    setIsLoading(!folder);
  }, [folder]);

  if (!folder) {
    return <NotFoundPage />;
  }
  return (
    <div className={styles.container}>
      <h2 style={{ marginBottom: "10px" }}>Modules</h2>
      {folderId && !isLoading ? (
        <ModuleList
          data={folder}
          handleNavigation={handleNavigation}
          handleAddModule={handleAddModule}
        />
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default Modules;
