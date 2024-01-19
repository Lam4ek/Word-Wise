import { useEffect } from "react";
import { useAppSelector } from "../../../Hooks";
import styles from "../WorkSpace.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Module from "./Module";

interface IModules {
  setFolderName: (name: string) => void;
}

const Modules: React.FC<IModules> = ({ setFolderName }) => {
  const { name } = useParams();

  const data = useAppSelector((state) => state.userData.folders);

  const navigate = useNavigate();
  const handleNavigation = (module: any) => {
    navigate(`${module}`);
  };

  useEffect(() => {
    if (name) {
      setFolderName(name);
    }
  }, [name]);

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Modules</h2>
      <div className={styles.cards}>
        {data && name ? (
          Object.keys(data[name]).map((dictionary: any) => (
            <Module
              key={Math.random()}
              dictionary={dictionary}
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
