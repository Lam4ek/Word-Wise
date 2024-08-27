import { FC } from "react";
import styles from "./Cards.module.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaRandom, FaPen } from "react-icons/fa";

interface ControlPanelProps {
  isFirstStep: boolean;
  handlePreviousCard: () => void;
  isLastStep: boolean;
  handleNextCard: () => void;
  setIsEditing: (value: boolean) => void;
  isEditing: boolean;
}

const ControlPanel: FC<ControlPanelProps> = ({
  isFirstStep,
  handlePreviousCard,
  isLastStep,
  handleNextCard,
  setIsEditing,
  isEditing,
}) => {
  return (
    <div className={styles.controlPanel}>
      <button>
        <FaRandom />
      </button>

      <div className={styles.slider}>
        <button
          className={isFirstStep ? styles.firstStep : styles.sliderButton}
          onClick={handlePreviousCard}
        >
          <IoIosArrowBack size={16} />
        </button>

        <button
          className={isLastStep ? styles.lastStep : styles.sliderButton}
          onClick={handleNextCard}
        >
          <IoIosArrowForward size={16} />
        </button>
      </div>

      <button onClick={() => setIsEditing(!isEditing)}>
        <FaPen />
      </button>
    </div>
  );
};

export default ControlPanel;
