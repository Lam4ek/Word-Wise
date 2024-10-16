// src/components/SigninForm.tsx
import { useState, FC } from "react";
import styles from "../AuthForm.module.css";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { loginUser } from "../../../../services/authService";

const SigninForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await loginUser(email, password);
      if (response.status === 200) {
        console.log(response);
        alert("Login successful!");
      } else {
        setError("Login failed.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <div className={`${styles.form__container} ${styles.sign__in}`}>
      <form onSubmit={handleLogin}>
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
        <span>or use your email & password</span>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <a href='#'>Forget Your Password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SigninForm;
