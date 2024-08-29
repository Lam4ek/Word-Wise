import {
  FC,
  useState,
  MouseEvent,
  KeyboardEventHandler,
  useEffect,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";

import styles from "../../Dashboard.module.css";
import { useContextMenu } from "../../../../Hooks";
import { FolderData } from "../../../../types/types";
import { renameFolder } from "../../../../store/dataSlice";
import { hexToRGBA } from "../../../../utils/hexToRGBA";
import { useFolderActions } from "../Hooks/useFolderAction";

interface FolderItemProps {
  folder: FolderData;
  handleNavigation: (folderId: string) => void;
}

const FolderItem: FC<FolderItemProps> = ({ folder, handleNavigation }) => {
  const { setContextMenu } = useContextMenu();
  const dispatch = useDispatch();
  const [newFolderName, setNewFolderName] = useState(folder.name);

  const [folderShadow, setFolderShadow] = useState(
    hexToRGBA(folder.color, "0.9")
  );

  const { contextMenu, setIsEditing, isEditing } = useFolderActions(folder.id);

  useEffect(() => {
    setFolderShadow(hexToRGBA(folder.color, "0.9"));
  }, [folder.color]);

  useEffect(() => {
    if (!isEditing) {
      setNewFolderName(folder.name);
    }
  }, [folder.name, isEditing]);

  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setContextMenu(contextMenu, [event.clientX, event.clientY]);
    },
    [setContextMenu, contextMenu]
  );

  const handleRename = () => {
    if (newFolderName.trim() !== "" && newFolderName !== folder.name) {
      dispatch(
        renameFolder({
          folderId: folder.id,
          newFolderName: newFolderName.trim(),
        })
      );
    }
    setIsEditing(false);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      handleRename();
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div
        onContextMenu={handleContextMenu}
        onClick={() => handleNavigation(folder.id)}
        className={styles.card}
        style={{
          backgroundColor: folder.color,
          boxShadow: folderShadow,
        }}
      >
        <h3 className={styles.cardTitle}>
          {folder.name.charAt(0).toUpperCase()}
        </h3>
      </div>
      {isEditing ? (
        <input
          className={styles.renameInput}
          type='text'
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={18}
          onBlur={handleRename}
          autoFocus
        />
      ) : (
        <span className={styles.cardSubTitle}>{folder.name}</span>
      )}
    </div>
  );
};

export default FolderItem;
