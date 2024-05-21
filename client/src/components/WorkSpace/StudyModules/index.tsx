import React, {
  useCallback,
  useMemo,
  MouseEvent,
  useState,
  KeyboardEventHandler,
} from "react";
import { useContextMenu } from "../../../Hooks";
import styles from "../WorkSpace.module.css";
import { useDispatch } from "react-redux";
import {
  changeColor,
  removeModule,
  renameModule,
} from "../../../store/dataSlice";
import { ModuleData } from "../../../types/types";

interface Module {
  module: ModuleData;
  folderId: string;
  handleNavigation: (moduleId: string) => void;
}

const Module: React.FC<Module> = ({ module, folderId, handleNavigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newModuleName, setNewModuleName] = useState(module.name);
  const { setContextMenu } = useContextMenu();
  const dispatch = useDispatch();
  const hexToRGBA = (hex: string, alpha: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `0px 2px 10px 0px rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const [folderShadow, setFolderShadow] = useState(
    hexToRGBA(module.color, "0.9")
  );

  const contextMenu = useMemo(
    () => [
      {
        name: "Remove module",
        onClick: () => {
          dispatch(removeModule({ folderId: folderId, moduleId: module.id }));
        },
      },
      {
        name: "Rename module",
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
              dispatch(
                changeColor({
                  folderId: folderId,
                  moduleId: module.id,
                  color: "#ff58a0",
                })
              );
            },
          },
          {
            name: "Blue",
            color: "#58afff",
            onClick: () => {
              dispatch(
                changeColor({
                  folderId: folderId,
                  moduleId: module.id,
                  color: "#58afff",
                })
              );
            },
          },
          {
            name: "Green",
            color: "#71ff58",
            onClick: () => {
              dispatch(
                changeColor({
                  folderId: folderId,
                  moduleId: module.id,
                  color: "#71ff58",
                })
              );
            },
          },
        ],
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

  const handleRename = (module: ModuleData) => {
    if (newModuleName.trim() !== "") {
      dispatch(
        renameModule({
          folderId: folderId,
          moduleId: module.id,
          newModuleName: newModuleName.trim(),
        })
      );
      setIsEditing(false); // Finish editing after submitting new name
    }
    setIsEditing(false);
    setNewModuleName(module.name);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      handleRename(module);
    }
  };
  return (
    <div className={styles.cardWrapper}>
      <div
        onClick={() => handleNavigation(module.id)}
        style={{ backgroundColor: module.color, boxShadow: folderShadow }}
        className={styles.card}
        onContextMenu={handleContextMenu}
      >
        <h3>{module.name.split("")[0].toUpperCase()}</h3>
      </div>
      {isEditing ? (
        <input
          className={styles.renameInput}
          type='text'
          value={newModuleName}
          onChange={(e) => setNewModuleName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => handleRename(module)}
          autoFocus
        />
      ) : (
        <span>{module.name}</span>
      )}
    </div>
  );
};

export default Module;
