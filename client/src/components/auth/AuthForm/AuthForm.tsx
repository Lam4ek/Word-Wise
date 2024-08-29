import React from "react";
import styles from "./AuthForm.module.css";

function AuthForm() {
  return (
    <div className={styles.container}>
      <form>
        <h1>Create Account</h1>
        <div className='social-icons'>
          <a href='#' className='icon'>
            <i className='fa-brands fa-google-plus-g'></i>
          </a>
          <a href='#' className='icon'>
            <i className='fa-brands fa-facebook-f'></i>
          </a>
          <a href='#' className='icon'>
            <i className='fa-brands fa-github'></i>
          </a>
          <a href='#' className='icon'>
            <i className='fa-brands fa-linkedin-in'></i>
          </a>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
