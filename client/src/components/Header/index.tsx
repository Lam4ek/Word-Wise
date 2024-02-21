import styles from "./Header.module.css";

function Header() {
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
        <span>JG</span>
      </div>
    </div>
  );
}

export default Header;
