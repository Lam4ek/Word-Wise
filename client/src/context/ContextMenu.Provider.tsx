import { FC, PropsWithChildren, useState, useCallback, useEffect } from "react";
import { ContextMenu, ContextMenuItem } from "./ContextMenu.context";
import styles from "./ContextMenu.module.css";

export const ContextMenuProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [contextMenuItems, setContextMenuItems] = useState<ContextMenuItem[]>(
    []
  );
  const [position, setPosition] = useState<number[]>();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const setContextMenu = useCallback(
    (items: ContextMenuItem[], position: number[]) => {
      setContextMenuItems(items);
      setPosition(position);
    },
    []
  );

  const closeMenu = useCallback(() => {
    setPosition(undefined);
    setShowSubmenu(false);
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", closeMenu);
    return () => {
      document.body.removeEventListener("click", closeMenu);
    };
  }, [closeMenu]);

  return (
    <ContextMenu.Provider value={{ setContextMenu }}>
      {!!position && (
        <ul
          style={{ left: position[0], top: position[1] }}
          className={styles.contextMenu}
        >
          {contextMenuItems.map((item) => (
            <li
              key={item.name}
              className={styles.contextMenuItem}
              onClick={item.onClick}
              onMouseEnter={() => item.subMenu && setShowSubmenu(true)}
              onMouseLeave={() => setShowSubmenu(false)}
            >
              {item.name}
              {item.subMenu && showSubmenu && (
                <ul className={styles.subMenu}>
                  {item.subMenu.map((subItem: any) => (
                    <li
                      key={subItem.name}
                      className={styles.subMenuItem}
                      onClick={subItem.onClick}
                    >
                      {subItem.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
      {children}
    </ContextMenu.Provider>
  );
};
