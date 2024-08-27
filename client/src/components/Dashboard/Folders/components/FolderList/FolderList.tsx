import { FC } from "react";
import FolderItem from "../FolderItem/FolderItem";
import styles from "../../../WorkSpace.module.css";
import { FolderData } from "../../../../../types/types";

interface FolderListProps {
  folders: FolderData[];
  handleNavigation: (folderId: string) => void;
  handleAddFolder: () => void;
}

const FolderList: FC<FolderListProps> = ({
  folders,
  handleNavigation,
  handleAddFolder,
}) => {
  return (
    <div className={styles.cards}>
      {folders.map((folder) => (
        <FolderItem
          key={folder.id}
          folder={folder}
          handleNavigation={handleNavigation}
        />
      ))}
      {folders.length < 24 && (
        <div onClick={handleAddFolder} className={styles.newCard}>
          <h3>+</h3>
        </div>
      )}
    </div>
  );
};

export default FolderList;
