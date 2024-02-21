import { useState, FC, useEffect } from "react";
import Folder from ".";
import styles from "../WorkSpace.module.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Hooks";
import { addFolder } from "../../../store/dataSlice";
import { useDispatch } from "react-redux";
import { FolderData } from "../../../types/types";
import NotFoundPage from "../NotFoundPage";

const Cards: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const data = useAppSelector((state) => state.userData.folders);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data]);

  const handleNavigation = (folder: string) => {
    navigate(`/${folder}`);
  };

  if (!data) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h2 style={{ marginBottom: "10px" }}>Folders</h2>
      {!isLoading && data ? (
        <div className={styles.cards}>
          {data.map((folder: FolderData) => (
            <Folder
              key={Math.random()}
              folder={folder}
              handleNavigation={handleNavigation}
            />
          ))}
          {data.length < 24 && (
            <div
              onClick={() => dispatch(addFolder())}
              className={styles.newCard}
            >
              <h3>+</h3>
            </div>
          )}
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default Cards;
