import { useEffect, useState } from "react";
import { useAppSelector } from "../../../Hooks";
import styles from "../WorkSpace.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Module from ".";
import { useDispatch } from "react-redux";
import { addModule } from "../../../store/dataSlice";
import { FolderData, ModuleData } from "../../../types/types";
import NotFoundPage from "../NotFoundPage";

const Modules: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { folderName } = useParams<{ folderName: string }>();

  const data = useAppSelector((state) =>
    state.userData.folders
      ? state.userData.folders.find(
          (folder: FolderData) => folder.name === folderName
        )
      : undefined
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleNavigation = (module: string) => {
    navigate(`${module}`);
  };

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data]);

  if (!data) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Modules</h2>
      {folderName && !isLoading ? (
        <div className={styles.cards}>
          {data.modules.map((module: ModuleData) => (
            <Module
              key={Math.random()}
              module={module}
              folderId={data.id}
              handleNavigation={handleNavigation}
            />
          ))}
          {data.modules.length < 24 && (
            <div
              onClick={() => {
                dispatch(addModule({ folderId: data.id }));
              }}
              className={styles.newCard}
            >
              <h3>+</h3>
            </div>
          )}
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default Modules;
