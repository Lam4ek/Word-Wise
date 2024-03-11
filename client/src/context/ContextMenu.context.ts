import { createContext } from "react";

export interface ContextMenuItem {
  name: string;
  onClick: () => void;
  subMenu?: any;
}

interface ContextMenuModel {
  setContextMenu: (items: ContextMenuItem[], position: number[]) => void;
}

export const ContextMenu = createContext<ContextMenuModel>({
  setContextMenu: () => {},
});
