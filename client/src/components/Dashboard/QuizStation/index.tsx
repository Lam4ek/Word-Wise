import styles from "./QuizStation.module.css";
import {
  PiCardsFill,
  PiFilesFill,
  PiSelectionBackgroundBold,
} from "react-icons/pi";
import { GiCycle } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  const handleNavigation = (program: string) => {
    navigate(`./${program}`);
  };

  return (
    <div className={styles.programs}>
      <div onClick={() => handleNavigation("flashcards")}>
        <PiCardsFill style={{ fontSize: "26px" }} />
        <span>Cards</span>
      </div>
      <div onClick={() => handleNavigation("memorization")}>
        <GiCycle style={{ fontSize: "26px" }} />
        <span>Memorization</span>
      </div>
      <div onClick={() => handleNavigation("test")}>
        <PiFilesFill style={{ fontSize: "26px" }} />
        <span>Test</span>
      </div>
      <div onClick={() => handleNavigation("selection")}>
        <PiSelectionBackgroundBold style={{ fontSize: "26px" }} />
        <span>Selection</span>
      </div>
    </div>
  );
}

export default Index;
