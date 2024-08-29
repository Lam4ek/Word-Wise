import React, {
  useCallback,
  MouseEvent,
  useState,
  KeyboardEventHandler,
  useEffect,
} from "react";
import styles from "../../Dashboard.module.css";
import { useDispatch } from "react-redux";

import { hexToRGBA } from "../../../../utils/hexToRGBA";
import { ModuleData } from "../../../../types/types";
import { useContextMenu } from "../../../../Hooks";
import { renameModule } from "../../../../store/dataSlice";
import { useModuleActions } from "../Hooks/useModuleAction";

interface ModuleItemProps {
  module: ModuleData;
  folderId: string;
  handleNavigation: (moduleId: string) => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({
  module,
  folderId,
  handleNavigation,
}) => {
  const [newModuleName, setNewModuleName] = useState(module.name);
  const { setContextMenu } = useContextMenu();
  const [moduleShadow, setModuleShadow] = useState(
    hexToRGBA(module.color, "0.9")
  );

  const { contextMenu, setIsEditing, isEditing } = useModuleActions(
    folderId,
    module
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setModuleShadow(hexToRGBA(module.color, "0.9"));
  }, [module.color]);

  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setContextMenu(contextMenu, [event.clientX, event.clientY]);
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
        style={{ backgroundColor: module.color, boxShadow: moduleShadow }}
        className={styles.card}
        onContextMenu={handleContextMenu}
      >
        <h3 className={styles.cardTitle}>
          {module.name.charAt(0).toUpperCase()}
        </h3>
      </div>
      {isEditing ? (
        <input
          className={styles.renameInput}
          type='text'
          value={newModuleName}
          onChange={(e) => setNewModuleName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => handleRename(module)}
          maxLength={18}
          autoFocus
        />
      ) : (
        <span className={styles.cardSubTitle}>{module.name}</span>
      )}
    </div>
  );
};

export default ModuleItem;
