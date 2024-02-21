import styles from "./Sidebar.module.css";

function RandomTest() {
  return (
    <div className={styles.test}>
      <h3>Want to test yourself?</h3>
      <span>
        Try our test, which consists of random different words of different
        difficulty levels
      </span>
      <button>Try it free</button>
    </div>
  );
}

export default RandomTest;
