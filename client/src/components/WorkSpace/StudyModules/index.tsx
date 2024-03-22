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
import { removeModule, renameModule } from "../../../store/dataSlice";
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
  const [moduleColor, setModuleColor] = useState("#58afff");
  const [moduleShadow, setModuleShadow] = useState(
    "0px 2px 10px 0px rgba(88, 174, 255, 0.9)"
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
            onClick: () => {
              setModuleColor("#ff58a0");
              setModuleShadow("0px 2px 10px 0px rgba(255, 88, 155, 0.9)");
            },
          },
          {
            name: "Blue",
            onClick: () => {
              setModuleColor("#58afff");
              setModuleShadow("0px 2px 10px 0px rgba(88, 174, 255, 0.9)");
            },
          },
          {
            name: "Green",
            onClick: () => {
              setModuleColor("#71ff58");
              setModuleShadow("0px 2px 10px 0px rgba(102, 255, 88, 0.9)");
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
        style={{ backgroundColor: moduleColor, boxShadow: moduleShadow }}
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
