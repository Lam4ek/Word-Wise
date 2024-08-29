import styles from "./Term.module.css";
import StudyPrograms from "../QuizStation";
import Cards from "./components/Cards";

const StudyPortal: React.FC = () => {
  return (
    <div className={styles.container}>
      <StudyPrograms />
      <Cards />
    </div>
  );
};

export default StudyPortal;
