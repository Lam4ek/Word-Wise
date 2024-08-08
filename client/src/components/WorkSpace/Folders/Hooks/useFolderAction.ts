import { useDispatch } from "react-redux";
import { changeColor, removeFolder } from "../../../../store/dataSlice";
import { useMemo, useState } from "react";

export const useFolderActions = (folderId: string) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const contextMenu = useMemo(
    () => [
      {
        name: "Remove folder",
        onClick: () => dispatch(removeFolder({ folderId: folderId })),
      },
      { name: "Rename folder", onClick: () => setIsEditing(true) },
      {
        name: "Change color",
        onClick: () => {},
        subMenu: [
          {
            name: "Red",
            color: "#ff58a0",
            onClick: () =>
              dispatch(changeColor({ folderId: folderId, color: "#ff58a0" })),
          },
          {
            name: "Blue",
            color: "#58afff",
            onClick: () =>
              dispatch(changeColor({ folderId: folderId, color: "#58afff" })),
          },
          {
            name: "Green",
            color: "#71ff58",
            onClick: () =>
              dispatch(changeColor({ folderId: folderId, color: "#71ff58" })),
          },
        ],
      },
    ],
    [dispatch, folderId]
  );

  return { contextMenu, isEditing, setIsEditing };
};
