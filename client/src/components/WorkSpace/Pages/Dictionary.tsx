import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../Hooks";
import styles from "./Folders.module.css";

interface IDictionaries {
  dictionary: any;
}

const Dictionary: React.FC<IDictionaries> = ({ dictionary }) => {
  return (
    <div className={styles.card}>
      <h3>{dictionary.split("")[0].toUpperCase()}</h3>
      <span>{dictionary}</span>
    </div>
  );
};

export default Dictionary;
