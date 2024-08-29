import { FC } from "react";
import styles from "../styles/Cards.module.css";
import { TermData } from "../../../../../types/types";

interface ICard {
  isFront: boolean;
  isAnimating: boolean;
  toggleCard: () => void;
  step: TermData;
}

const Card: FC<ICard> = ({ isFront, isAnimating, toggleCard, step }) => {
  return (
    <div
      className={`${styles.card} ${!isFront ? "" : styles.flipped} ${
        isAnimating ? styles.animating : ""
      }`}
      onClick={toggleCard}
    >
      <div className={styles.textContainer}>
        <p className={`${isFront ? styles.textFlipped : ""} `}>
          {isFront ? step.term : step.definition}
        </p>
      </div>
    </div>
  );
};

export default Card;
