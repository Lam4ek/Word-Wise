import { useDispatch } from "react-redux";
import { addTerm, changeTerm, removeTerm } from "../store/dataSlice";

export function useTermData() {
  const dispatch = useDispatch();
  const addNewTerm = (folderId: string, moduleId: string) => {
    dispatch(addTerm({ folderId: folderId, moduleId: moduleId }));
  };

  const removeHandler = (folderId: string, moduleId: string, id: number) => {
    dispatch(
      removeTerm({ folderId: folderId, moduleId: moduleId, termId: id })
    );
  };

  const changeHandler = (
    folderId: string,
    moduleId: string,
    term: string,
    definition: string,
    id: number
  ) => {
    dispatch(
      changeTerm({
        folderId: folderId,
        moduleId: moduleId,
        termId: id,
        newTerm: term,
        newDefinition: definition,
      })
    );
  };

  return { addNewTerm, removeHandler, changeHandler };
}
