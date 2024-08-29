import React from "react";
import styles from "../styles/Selection.module.css";
import { IoMdClose } from "react-icons/io";

interface HeaderProps {
  onBackClick: () => void;
  children: React.ReactNode;
  isGameOver?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onBackClick,
  children,
  isGameOver,
}) => {
  return (
    <div className={styles.header}>
      <h3>{children}</h3>
      {isGameOver && (
        <p className={styles.gameOverText}>
          Congratulations! You've completed the game!
        </p>
      )}
      <button onClick={onBackClick}>
        <IoMdClose />
      </button>
    </div>
  );
};

export default Header;
