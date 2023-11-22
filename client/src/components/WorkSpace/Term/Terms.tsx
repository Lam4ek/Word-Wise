import React from "react";
import Term from "./Term";
import styles from "./Term.module.css";
import { useNavigate } from "react-router-dom";
import {
  PiCardsFill,
  PiFilesFill,
  PiSelectionBackgroundBold,
} from "react-icons/pi";
import { GiCycle } from "react-icons/gi";

function Terms() {
  const test = [1, 2, 3, 4, 5];
  const navigate = useNavigate();

  const handleNavigation = (program: string) => {
    navigate(`./program/${program}`);
  };
  return (
    <div style={{ height: "90%" }}>
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

      <div className={styles.cards_wrapper}>
        <div>{test ? test.map((el) => <Term />) : ""}</div>
      </div>
    </div>
  );
}

export default Terms;
