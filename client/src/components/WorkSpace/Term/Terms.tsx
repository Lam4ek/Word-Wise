import { useState, useEffect } from "react";
import Term from "./Term";
import styles from "./Term.module.css";
import { useNavigate, useParams } from "react-router-dom";
import StudyPrograms from "../StudyPrograms";
import { useAppSelector } from "../../../Hooks";

interface ITerms {
  folderName: string;
}

const Terms: React.FC<ITerms> = ({ folderName }) => {
  const { name } = useParams();

  const data = useAppSelector((state) => state.userData.folders);
  console.log(data);

  const navigate = useNavigate();

  const handleNavigation = (program: string) => {
    navigate(`${program}`);
  };

  useEffect(() => {
    if (!folderName) {
      navigate(`/`);
    }
  }, [name, folderName]);

  return (
    <div style={{ height: "90%" }}>
      <StudyPrograms />
      <div className={styles.cards_wrapper}>
        <div>
          {name && folderName
            ? data[folderName][name].map((term: any, index: string) => (
                <Term key={Math.random()} data={term} index={index} />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Terms;
