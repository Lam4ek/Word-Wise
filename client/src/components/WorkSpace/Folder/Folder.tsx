import React from "react";
import styles from "../WorkSpace.module.css";

interface ICard {
  folder: any;
  handleNavigation: (folder: string) => void;
}

const Card: React.FC<ICard> = ({ folder, handleNavigation }) => {
  return (
    <div onClick={() => handleNavigation(folder)} className={styles.card}>
      <h3>{folder.split("")[0].toUpperCase()}</h3>
      <span>{folder}</span>
    </div>
  );
};

export default Card;
