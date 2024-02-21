import {
  useCallback,
  FC,
  MouseEvent,
  useMemo,
  useState,
  KeyboardEventHandler,
} from "react";
import styles from "../WorkSpace.module.css";
import { useContextMenu } from "../../../Hooks/useContextMenu";
import { removeFolder, renameFolder } from "../../../store/dataSlice";
import { useDispatch } from "react-redux";
import { FolderData } from "../../../types/types";

interface IFolder {
  folder: FolderData;
  handleNavigation: (folderId: string) => void;
}

const Folder: FC<IFolder> = ({ folder, handleNavigation }) => {
  const { setContextMenu } = useContextMenu();
  const dispatch = useDispatch();
  const [newFolderName, setNewFolderName] = useState(folder.name);
  const [isEditing, setIsEditing] = useState(false);

  const contextMenu = useMemo(
    () => [
      {
        name: "Remove folder",
        onClick: () => {
          dispatch(removeFolder({ folderId: folder.id }));
        },
      },
      {
        name: "Rename folder",
        onClick: () => {
          setIsEditing(true);
        },
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

  const handleRename = (folder: FolderData) => {
    if (newFolderName.trim() !== "") {
      dispatch(
        renameFolder({
          folderId: folder.id,
          newFolderName: newFolderName.trim(),
        })
      );
      setIsEditing(false); // Finish editing after submitting new name
    }
    setNewFolderName(folder.name);
    setIsEditing(false);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      handleRename(folder);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div
        onContextMenu={handleContextMenu}
        onClick={() => handleNavigation(folder.id)}
        className={styles.card}
      >
        <h3>{folder.name.split("")[0].toUpperCase()}</h3>
      </div>
      {isEditing ? (
        <input
          className={styles.renameInput}
          type='text'
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => handleRename(folder)} // Submit changes when focus is lost
          autoFocus
        />
      ) : (
        <span>{folder.name}</span>
      )}
    </div>
  );
};

export default Folder;
