import { useEffect, useState } from "react";
import Term from ".";
import styles from "./Term.module.css";
import { useNavigate, useParams } from "react-router-dom";
import StudyPrograms from "../StudyPrograms";
import { useAppSelector } from "../../../Hooks";
import { removeTerm, changeTerm, addTerm } from "../../../store/dataSlice";
import { useDispatch } from "react-redux";
import { TTerm } from "../../../types/types";

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

  const changeHandler = (term: string, definition: string, id: number) => {
    dispatch(
      changeTerm({
        folder: folderName,
        module: moduleName,
        termId: id,
        newTerm: term,
        newDefinition: definition,
      })
    );
  };

  const addNewTerm = () => {
    dispatch(addTerm({ folder: folderName, module: moduleName }));
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
          <div onClick={addNewTerm} className={styles.new_card}>
            <h3>+Add card</h3>
          </div>
          {!isLoading && moduleName && folderName ? (
            data[folderName][moduleName].map((term: TTerm, index: string) => (
              <Term
                key={Math.random()}
                data={term}
                index={index}
                removeHandler={removeHandler}
                changeHandler={changeHandler}
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
