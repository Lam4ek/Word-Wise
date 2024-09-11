// src/components/ToggleContainer.tsx
import React from "react";
import styles from "../AuthForm.module.css";
import classNames from "classnames";

interface ToggleContainerProps {
  handleToggle: () => void;
  isSignup: boolean;
}

const ToggleContainer: React.FC<ToggleContainerProps> = ({
  handleToggle,
  isSignup,
}) => {
  return (
    <div className={styles.toggle__container}>
      <div
        className={classNames(styles.toggle, {
          [styles.active]: isSignup,
        })}
      >
        <div
          className={classNames(styles.toggle__panel, styles.toggle__left, {
            [styles.active]: !isSignup,
          })}
        >
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to use all of site features</p>
          <button onClick={handleToggle} className={styles.hidden}>
            Sign In
          </button>
        </div>
        <div
          className={classNames(styles.toggle__panel, styles.toggle__right, {
            [styles.active]: isSignup,
          })}
        >
          <h1>Hello, Friend!</h1>
          <p>Register with your personal details to use all of site features</p>
          <button onClick={handleToggle} className={styles.hidden}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleContainer;
