import { useState } from "react";
import styles from "./Header.module.css";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className={styles.header}>
      <ul>
        <li>Home</li>
        <li>Projects</li>
        <li>Inbox</li>
        <li>Teams</li>
      </ul>
      <div className={styles.profile}>
        <button>Upgrade</button>
        {isLogin ? (
          <span className={styles.profile__img}>JG</span>
        ) : (
          <span className={styles.login__btn}>Login</span>
        )}
      </div>
    </div>
  );
}

export default Header;
