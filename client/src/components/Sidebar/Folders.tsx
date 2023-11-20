import React from "react";
import styles from "./Sidebar.module.css";
import { useAppSelector } from "../../Hooks";
import { useNavigate } from "react-router-dom";

function Folders() {
  const data = useAppSelector((state) => state.userData);

  const navigate = useNavigate();

  const foldersNavigation = (folder: any) => {
    navigate(`/folder/${folder}`);
  };

  return (
    <div>
      <h2>folders</h2>
      <ul className={styles.list}>
        {data.folders
          ? Object.keys(data.folders).map((folder: any) => (
              <li onClick={() => foldersNavigation(folder)} key={Math.random()}>
                <span>{folder}</span>
              </li>
            ))
          : ""}
      </ul>

      <span onClick={() => navigate("/")} className={styles.view_btn}>
        View all
      </span>
    </div>
  );
}

export default Folders;
