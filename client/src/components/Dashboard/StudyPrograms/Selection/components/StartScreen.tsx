import { TbCards } from "react-icons/tb";
import styles from "../styles/Selection.module.css";

interface StartScreenProps {
  handleStartGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ handleStartGame }) => {
  return (
    <div className={styles.startScreen__container}>
      <TbCards size={96} />
      <h4>Ready?</h4>
      <span>Match all terms and definitions as quickly as possible.</span>
      <button onClick={handleStartGame} className={styles.startButton}>
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
