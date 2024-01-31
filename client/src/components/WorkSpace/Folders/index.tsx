import React from "react";
import styles from "../WorkSpace.module.css";

interface IFolder {
  folder: string;
  handleNavigation: (folder: string) => void;
}

const Folder: React.FC<IFolder> = ({ folder, handleNavigation }) => {
  return (
    <div onClick={() => handleNavigation(folder)} className={styles.card}>
      <h3>{folder.split("")[0].toUpperCase()}</h3>
      <span>{folder}</span>
    </div>
  );
};

export default Folder;
