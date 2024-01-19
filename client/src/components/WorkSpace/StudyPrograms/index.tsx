import React from "react";
import styles from "./StudyPrograms.module.css";
import {
  PiCardsFill,
  PiFilesFill,
  PiSelectionBackgroundBold,
} from "react-icons/pi";
import { GiCycle } from "react-icons/gi";

function index() {
  return (
    <div className={styles.programs}>
      <div>
        <PiCardsFill style={{ fontSize: "26px" }} />
        <span>Cards</span>
      </div>
      <div>
        <GiCycle style={{ fontSize: "26px" }} />
        <span>Memorization</span>
      </div>
      <div>
        <PiFilesFill style={{ fontSize: "26px" }} />
        <span>Test</span>
      </div>
      <div>
        <PiSelectionBackgroundBold style={{ fontSize: "26px" }} />
        <span>Selection</span>
      </div>
    </div>
  );
}

export default index;
