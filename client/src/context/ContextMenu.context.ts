import { createContext } from "react";

export interface SubMenuItem {
  name: string;
  color: string;
  onClick: () => void;
}
export interface ContextMenuItem {
  name: string;
  onClick: () => void;
  subMenu?: SubMenuItem[];
}

interface ContextMenuModel {
  setContextMenu: (items: ContextMenuItem[], position: number[]) => void;
}

export const ContextMenu = createContext<ContextMenuModel>({
  setContextMenu: () => {},
});
