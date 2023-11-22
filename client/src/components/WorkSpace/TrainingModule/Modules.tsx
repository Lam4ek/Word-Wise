import React from "react";
import { useAppSelector } from "../../../Hooks";
import styles from "../WorkSpace.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Module from "./Module";

function Dictionaries() {
  const { name } = useParams();
  const data = useAppSelector((state) => state.userData.folders);

  const navigate = useNavigate();
  const handleNavigation = (module: any) => {
    navigate(`./module/${module}`);
  };

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
}

export default Dictionaries;
