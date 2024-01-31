import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../Hooks";
import styles from "../WorkSpace.module.css";

interface IDictionaries {
  dictionary: string;
  handleNavigation: (module: string) => void;
}

const Dictionary: React.FC<IDictionaries> = ({
  dictionary,
  handleNavigation,
}) => {
  return (
    <div onClick={() => handleNavigation(dictionary)} className={styles.card}>
      <h3>{dictionary.split("")[0].toUpperCase()}</h3>
      <span>{dictionary}</span>
    </div>
  );
};

export default Dictionary;
