import { useState, ChangeEvent, FC } from "react";
import Switch from "@mui/material/Switch";
import styles from "./TestSettings.module.css";

import Header from "./components/Header";

interface ITest {
  questions: string;
  setQuestions: (value: string) => void;
  trueFalse: boolean;
  setTrueFalse: (prop: boolean) => void;
  multipleChoice: boolean;
  setMultipleChoice: (prop: boolean) => void;
  matching: boolean;
  setMatching: (prop: boolean) => void;
  written: boolean;
  setWritten: (prop: boolean) => void;
  setUpTest: () => void;
  name: string;
}

const TestSettings: FC<ITest> = ({
  questions,
  setQuestions,
  trueFalse,
  setTrueFalse,
  multipleChoice,
  setMultipleChoice,
  matching,
  setMatching,
  written,
  setWritten,
  setUpTest,
  name,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && Number(value) <= 10)) {
      setQuestions(value);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/\D/g, "");
    const numValue = Number(cleanedValue);
    if (numValue === 0 && cleanedValue !== "") {
      e.target.value = "1";
      setQuestions("1");
    }

    if (numValue > 10) {
      e.target.value = "10";
      setQuestions("10");
    } else if (cleanedValue !== value) {
      e.target.value = cleanedValue;
      setQuestions(cleanedValue);
    } else {
      setQuestions(cleanedValue);
    }
  };
  return (
    <>
      <Header name={name} />
      <div className={styles.settingsWrapper}>
        <div className={styles.settings}>
          <span>
            Questions <span>(maximum 10)</span>
          </span>
          <input
            className={styles.text__input}
            type='number'
            max={10}
            value={questions}
            onChange={handleInputChange}
            onInput={handleInput}
          />
        </div>
        <div className={styles.settings}>
          <span>True/false</span>
          <Switch
            onChange={() => setTrueFalse(!trueFalse)}
            checked={trueFalse}
          />
        </div>
        <div className={styles.settings}>
          <span>Multiple Choice</span>
          <Switch
            onChange={() => setMultipleChoice(!multipleChoice)}
            checked={multipleChoice}
          />
        </div>
        <div className={styles.settings}>
          <span>Matching</span>
          <Switch onChange={() => setMatching(!matching)} checked={matching} />
        </div>
        <div className={styles.settings}>
          <span>Written answers</span>
          <Switch onChange={() => setWritten(!written)} checked={written} />
        </div>
      </div>
      <button onClick={() => setUpTest()} className={styles.settingsBtn}>
        Start test
      </button>
    </>
  );
};

export default TestSettings;
