import React from "react";
import styles from "./Sidebar.module.css";
import { useAppSelector } from "../../Hooks";
import { useNavigate } from "react-router-dom";
import { FolderData } from "../../types/types";

function Folders() {
  const data = useAppSelector((state) => state.userData.folders);

  const navigate = useNavigate();

  const foldersNavigation = (folder: string) => {
    navigate(`/${folder}`);
  };

  return (
    <div>
      <h2>folders</h2>
      <ul className={styles.list}>
        {data
          ? data.slice(0, 6).map((folder: FolderData) => (
              <li
                onClick={() => foldersNavigation(folder.name)}
                key={Math.random()}
              >
                <span>{folder.name}</span>
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
