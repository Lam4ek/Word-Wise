import { FC } from "react";
import { FolderData, ModuleData } from "../../../../types/types";
import ModuleItem from "./ModuleItem";
import styles from "../../Dashboard.module.css";

interface ModuleListProps {
  data: FolderData;
  handleNavigation: (moduleId: string) => void;
  handleAddModule: () => void;
}

const ModuleList: FC<ModuleListProps> = ({
  data,
  handleNavigation,
  handleAddModule,
}) => {
  return (
    <div className={styles.cards}>
      {data.modules.map((module: ModuleData) => (
        <ModuleItem
          key={Math.random()}
          module={module}
          folderId={data.id}
          handleNavigation={handleNavigation}
        />
      ))}
      {data.modules.length < 24 && (
        <div onClick={handleAddModule} className={styles.newCard}>
          <h3>+</h3>
        </div>
      )}
    </div>
  );
};

export default ModuleList;
