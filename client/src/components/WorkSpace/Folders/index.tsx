import { useCallback, FC, MouseEvent, useMemo } from "react";
import styles from "../WorkSpace.module.css";
import { useContextMenu } from "../../../Hooks/useContextMenu";
import { removeFolder } from "../../../store/dataSlice";
import { useDispatch } from "react-redux";

interface IFolder {
  folder: string;
  handleNavigation: (folder: string) => void;
}

const Folder: FC<IFolder> = ({ folder, handleNavigation }) => {
  const { setContextMenu } = useContextMenu();
  const dispatch = useDispatch();

  const contextMenu = useMemo(
    () => [
      {
        name: "Remove folder",
        onClick: () => {
          dispatch(removeFolder({ folder: folder }));
        },
      },
      {
        name: "Rename folder",
        onClick: () => {},
      },
      {
        name: "Change color",
        onClick: () => {},
      },
    ],
    []
  );

  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const { clientX, clientY } = event;

      setContextMenu(contextMenu, [clientX, clientY]);
    },
    [setContextMenu, contextMenu]
  );
  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={() => handleNavigation(folder)}
      className={styles.card}
    >
      <h3>{folder.split("")[0].toUpperCase()}</h3>
      <span>{folder}</span>
    </div>
  );
};

export default Folder;
