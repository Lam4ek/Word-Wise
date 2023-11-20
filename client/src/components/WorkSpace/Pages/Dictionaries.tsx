import React from "react";
import { useAppSelector } from "../../../Hooks";
import styles from "./Folders.module.css";
import { useParams } from "react-router-dom";
import Dictionary from "./Dictionary";

function Dictionaries() {
  const { name } = useParams();
  const data = useAppSelector((state) => state.userData.folders);

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Dictionary</h2>
      <div className={styles.cards}>
        {data && name ? (
          Object.keys(data[name]).map((dictionary: any) => (
            <Dictionary key={Math.random()} dictionary={dictionary} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Dictionaries;
