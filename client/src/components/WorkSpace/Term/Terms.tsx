import { useEffect, useState } from "react";
import Term from "./Term";
import styles from "./Term.module.css";
import { useNavigate, useParams } from "react-router-dom";
import StudyPrograms from "../StudyPrograms";
import { useAppSelector } from "../../../Hooks";
import { removeTerm } from "../../../store/dataSlice";
import { useDispatch } from "react-redux";

type TTerm = {
  term: string;
  definition: string;
  id: number;
};

const Terms: React.FC = () => {
  const { moduleName, folderName } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const data = useAppSelector((state) => state.userData.folders);

  // const navigate = useNavigate();

  // const handleNavigation = (program: string) => {
  //   navigate(`${program}`);
  // };

  const dispatch = useDispatch();

  const removeHandler = (id: number) => {
    dispatch(
      removeTerm({ folder: folderName, module: moduleName, termId: id })
    );
  };

  useEffect(() => {
    if (data && moduleName && folderName) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data, moduleName, folderName]);

  return (
    <div style={{ height: "90%" }}>
      <StudyPrograms />
      <div className={styles.cards_wrapper}>
        <div>
          {!isLoading && moduleName && folderName ? (
            data[folderName][moduleName].map((term: TTerm, index: string) => (
              <Term
                key={Math.random()}
                data={term}
                index={index}
                removeHandler={removeHandler}
              />
            ))
          ) : (
            <>Loading</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terms;
