// src/components/SignupForm.tsx
import { useState, FC } from "react";
import styles from "../AuthForm.module.css";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { registerUser } from "../../../../services/authService";

const SignupForm: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await registerUser(username, email, password);
      if (response.status === 200) {
        alert("Registration successful!");
      } else {
        setError("Registration failed.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={`${styles.form__container} ${styles.sign__up}`}>
      <form onSubmit={handleRegister}>
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
        <span>Register using email or via one of the following services</span>
        <input
          type='text'
          placeholder='Name'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button>Sign Up</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default SignupForm;
