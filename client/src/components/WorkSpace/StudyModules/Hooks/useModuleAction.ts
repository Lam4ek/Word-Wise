import { useDispatch } from "react-redux";
import { changeColor, removeModule } from "../../../../store/dataSlice";
import { useMemo, useState } from "react";
import { ModuleData } from "../../../../types/types";

export const useModuleActions = (folderId: string, module: ModuleData) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

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
    [dispatch, module.id]
  );

  return {
    contextMenu,
    isEditing,
    setIsEditing,
  };
};
