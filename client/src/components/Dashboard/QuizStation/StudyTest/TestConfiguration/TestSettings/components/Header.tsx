import React from "react";
import styles from "../TestSettings.module.css";
import { PiExam } from "react-icons/pi";

interface IHeader {
  name: string;
}

const Header: React.FC<IHeader> = ({ name }) => {
  return (
    <div className={styles.cardHeader}>
      <div>
        <h2>{name}</h2>
        <span>Set up your test</span>
      </div>
      <div>
        <PiExam size={48} />
      </div>
    </div>
  );
};

export default Header;
