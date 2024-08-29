import { useEffect, useState } from "react";
import styles from "../Term.module.css";
import { TermData } from "../../../../types/types";
import Card from "./Card";
import { useModuleData } from "../../../../Hooks/useModuleData";
import NotFoundPage from "../../../../pages/NotFoundPage/NotFoundPage";
import { useTermData } from "../../../../Hooks/useTermData";

function Cards() {
  const { module, folder } = useModuleData();
  const { addNewTerm } = useTermData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (module) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [module]);

  if (!module) {
    return <NotFoundPage />;
  }
  return (
    <div className={styles.cards_wrapper}>
      <div
        onClick={() => addNewTerm(folder.id, module.id)}
        className={styles.new_card}
      >
        <h3>+Add card</h3>
      </div>
      {!isLoading ? (
        module.terms.map((term: TermData, index: string) => (
          <Card
            key={Math.random()}
            term={term}
            index={index}
            folderId={folder.id}
            moduleId={module.id}
          />
        ))
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Cards;
