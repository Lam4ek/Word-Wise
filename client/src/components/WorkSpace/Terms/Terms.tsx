import { useEffect, useState } from "react";
import Term from ".";
import styles from "./Term.module.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import StudyPrograms from "../StudyPrograms";
import { useAppSelector } from "../../../Hooks";
import { removeTerm, changeTerm, addTerm } from "../../../store/dataSlice";
import { useDispatch } from "react-redux";
import { FolderData, ModuleData, TermData } from "../../../types/types";
import NotFoundPage from "../NotFoundPage";

const Terms: React.FC = () => {
  const { moduleName, folderName } = useParams<{
    folderName: string;
    moduleName: string;
  }>();

  const [isLoading, setIsLoading] = useState(true);

  const folder = useAppSelector((state) =>
    state.userData.folders
      ? state.userData.folders.find(
          (folder: FolderData) => folder.name === folderName
        )
      : undefined
  );

  const data = folder?.modules?.find(
    (module: ModuleData) => module.name === moduleName
  );

  const dispatch = useDispatch();

  const removeHandler = (id: number) => {
    dispatch(
      removeTerm({ folderId: folder.id, moduleId: data.id, termId: id })
    );
  };

  const changeHandler = (term: string, definition: string, id: number) => {
    dispatch(
      changeTerm({
        folderId: folder.id,
        moduleId: data.id,
        termId: id,
        newTerm: term,
        newDefinition: definition,
      })
    );
  };
  const addNewTerm = () => {
    dispatch(addTerm({ folderId: folder.id, moduleId: data.id }));
  };

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data]);

  if (!data) {
    return <NotFoundPage />;
  }

  return (
    <div style={{ height: "90%" }}>
      <StudyPrograms />
      <div className={styles.cards_wrapper}>
        <div>
          <div onClick={addNewTerm} className={styles.new_card}>
            <h3>+Add card</h3>
          </div>
          {!isLoading && moduleName && folderName ? (
            data.terms.map((term: TermData, index: string) => (
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
