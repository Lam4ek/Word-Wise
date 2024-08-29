// src/components/SignupForm.tsx
import React from "react";
import styles from "./AuthForm.module.css";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";

const SignupForm: React.FC = () => {
  return (
    <div className={`${styles.form__container} ${styles.sign__up}`}>
      <form>
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input type='text' placeholder='Name' />
        <input type='email' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
