import { useEffect } from "react";
import { useAppSelector } from "../../../Hooks";
import styles from "../WorkSpace.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Module from ".";

const Modules: React.FC = () => {
  const { folderName } = useParams();

  const data = useAppSelector((state) => state.userData.folders);

  const navigate = useNavigate();
  const handleNavigation = (module: string) => {
    navigate(`${module}`);
  };

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Modules</h2>
      <div className={styles.cards}>
        {data && folderName ? (
          Object.keys(data[folderName]).map((module: string) => (
            <Module
              key={Math.random()}
              module={module}
              folder={folderName}
              handleNavigation={handleNavigation}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Modules;
