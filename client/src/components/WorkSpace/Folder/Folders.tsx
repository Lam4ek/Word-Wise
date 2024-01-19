import React from "react";
import Folder from "./Folder";
import { TData } from "../../../types/data";
import styles from "../WorkSpace.module.css";
import { useNavigate } from "react-router-dom";

interface ICards {
  data: TData;
}

const Cards: React.FC<ICards> = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigation = (folder: string) => {
    navigate(`${folder}`);
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
