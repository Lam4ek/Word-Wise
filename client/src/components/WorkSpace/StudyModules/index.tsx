import React, { useCallback, useMemo, MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useContextMenu } from "../../../Hooks";
import styles from "../WorkSpace.module.css";
import { useDispatch } from "react-redux";
import { removeModule } from "../../../store/dataSlice";

interface IDictionaries {
  module: string;
  folder: string;
  handleNavigation: (module: string) => void;
}

const Dictionary: React.FC<IDictionaries> = ({
  module,
  folder,
  handleNavigation,
}) => {
  const { setContextMenu } = useContextMenu();
  const dispatch = useDispatch();

  const contextMenu = useMemo(
    () => [
      {
        name: "Remove module",
        onClick: () => {
          dispatch(removeModule({ folder: folder, module: module }));
        },
      },
      {
        name: "Rename module",
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
      onClick={() => handleNavigation(module)}
      className={styles.card}
      onContextMenu={handleContextMenu}
    >
      <h3>{module.split("")[0].toUpperCase()}</h3>
      <span>{module}</span>
    </div>
  );
};

export default Dictionary;
