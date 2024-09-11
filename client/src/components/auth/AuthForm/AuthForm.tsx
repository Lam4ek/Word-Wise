// src/components/AuthForm.tsx
import React, { useState } from "react";
import styles from "./AuthForm.module.css";
import SigninForm from "./components/SigninForm";
import SignupForm from "./components/SignupForm";
import ToggleContainer from "./components/ToggleContainer";
import classNames from "classnames";

const AuthForm: React.FC = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);

  const handleToggle = () => {
    setIsSignup((prev) => !prev);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.active]: isSignup,
      })}
    >
      <ToggleContainer handleToggle={handleToggle} isSignup={isSignup} />
      {isSignup ? <SignupForm /> : <SigninForm />}
    </div>
  );
};

export default AuthForm;
