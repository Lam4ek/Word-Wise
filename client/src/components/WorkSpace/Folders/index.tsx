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
import {
  changeColor,
  removeFolder,
  renameFolder,
} from "../../../store/dataSlice";
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

  const hexToRGBA = (hex: string, alpha: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `0px 2px 10px 0px rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const [folderShadow, setFolderShadow] = useState(
    hexToRGBA(folder.color, "0.9")
  );

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
        subMenu: [
          {
            name: "Red",
            color: "#ff58a0",
            onClick: () => {
              dispatch(changeColor({ folderId: folder.id, color: "#ff58a0" }));
            },
          },
          {
            name: "Blue",
            color: "#58afff",
            onClick: () => {
              dispatch(changeColor({ folderId: folder.id, color: "#58afff" }));
            },
          },
          {
            name: "Green",
            color: "#71ff58",
            onClick: () => {
              dispatch(changeColor({ folderId: folder.id, color: "#71ff58" }));
            },
          },
        ],
      },
    ],
    [dispatch, folder.id, setIsEditing]
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
        style={{ backgroundColor: folder.color, boxShadow: folderShadow }}
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
          maxLength={18}
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
