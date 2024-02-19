import { useState, FC } from "react";
import Folder from ".";
import styles from "../WorkSpace.module.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Hooks";
import { addFolder } from "../../../store/dataSlice";
import { useDispatch } from "react-redux";

const Cards: FC = () => {
  const data = useAppSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (folder: string) => {
    navigate(`/${folder}`);
  };

  return (
    <>
      <h2 style={{ marginBottom: "10px" }}>Folders</h2>
      <div className={styles.cards}>
        {data.folders ? (
          Object.keys(data.folders).map((folder: string) => (
            <Folder
              key={Math.random()}
              folder={folder}
              handleNavigation={handleNavigation}
            />
          ))
        ) : (
          <></>
        )}
        <div onClick={() => dispatch(addFolder({}))} className={styles.newCard}>
          <h3>+</h3>
        </div>
      </div>
    </>
  );
};

export default Cards;
