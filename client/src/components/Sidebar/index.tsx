import React from "react";
import styles from "./Sidebar.module.css";
import Folders from "./Folders";
import RandomTest from "./RandomTest";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Folders />
      <RandomTest />
    </div>
  );
}

export default Sidebar;
