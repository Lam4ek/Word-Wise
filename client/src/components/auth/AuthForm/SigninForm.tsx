// src/components/SigninForm.tsx
import React from "react";
import styles from "./AuthForm.module.css";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";

const SigninForm: React.FC = () => {
  return (
    <div className={`${styles.form__container} ${styles.sign__in}`}>
      <form>
        <h1>Sign In</h1>
        <div className={styles.social__icons}>
          <a href='#' className={styles.icon}>
            <FaGoogle size={14} />
          </a>
          <a href='#' className={styles.icon}>
            <FaFacebook size={14} />
          </a>
          <a href='#' className={styles.icon}>
            <FaGithub size={14} />
          </a>
          <a href='#' className={styles.icon}>
            <FaLinkedinIn size={14} />
          </a>
        </div>
        <span>or use your email password</span>
        <input type='email' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <a href='#'>Forget Your Password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SigninForm;
