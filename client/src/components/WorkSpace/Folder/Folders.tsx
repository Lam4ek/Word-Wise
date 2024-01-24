import React from "react";
import Folder from "./Folder";
import styles from "../WorkSpace.module.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Hooks";

const Cards: React.FC = () => {
  const data = useAppSelector((state) => state.userData);
  const navigate = useNavigate();

  const handleNavigation = (folder: string) => {
    navigate(`/${folder}`);
  };

  return (
    <>
      <h2 style={{ marginBottom: "10px" }}>Folders</h2>
      <div className={styles.cards}>
        {data.folders ? (
          Object.keys(data.folders).map((folder: any) => (
            <Folder
              key={Math.random()}
              folder={folder}
              handleNavigation={handleNavigation}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Cards;
