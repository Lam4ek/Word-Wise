import { useState, useEffect } from "react";
import styles from "./StudyTest.module.css";
import TestSettings from "./TestConfiguration/TestSettings";
import Matching from "./TestConfiguration/TestConditions/Matching";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../Hooks";
import { FolderData, ModuleData, TermData } from "../../../../types/types";
import TrueFalse from "./TestConfiguration/TestConditions/TrueFalse";

import Written from "./TestConfiguration/TestConditions/Written/Written";

import Progressbar from "../../../../ui/Progressbar";
import MultipleChoice from "./TestConfiguration/TestConditions/MultipleChoise";

function Test() {
  const [questions, setQuestions] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [trueFalse, setTrueFalse] = useState(false);
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [matching, setMatching] = useState(false);
  const [written, setWritten] = useState(false);
  const [startTest, setStartTest] = useState(false);
  const [score, setScore] = useState(0);
  const [isTestFinished, setIsTestFinished] = useState(false);

  const [trueFalseTerms, setTrueFalseTerms] = useState<TermData[]>([]);
  const [multipleChoiceTerms, setMultipleChoiceTerms] = useState<TermData[]>(
    []
  );
  const [matchingTerms, setMatchingTerms] = useState<TermData[]>([]);
  const [writtenTerms, setWrittenTerms] = useState<TermData[]>([]);

  const { moduleId, folderId } = useParams<{
    folderId: string;
    moduleId: string;
  }>();
  const folder = useAppSelector((state) =>
    state.userData.folders
      ? state.userData.folders.find(
          (folder: FolderData) => folder.id === folderId
        )
      : undefined
  );

  const module = folder?.modules?.find(
    (module: ModuleData) => module.id === moduleId
  );

  useEffect(() => {
    if (module && folder) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [module, folder]);

  const setUpTest = () => {
    if (isLoading) return;

    const shuffledTerms = [...module.terms].sort(() => 0.5 - Math.random());
    const numQuestions = Math.min(Number(questions), 10);

    const activeOptions: Record<string, boolean> = {
      trueFalse: trueFalse,
      multipleChoice: multipleChoice,
      matching: matching,
      written: written,
    };

    const filteredOptions = Object.keys(activeOptions).filter(
      (key) => activeOptions[key]
    );

    if (filteredOptions.length === 0) {
      return;
    }

    const hasMatching = filteredOptions.includes("matching");

    if (hasMatching && numQuestions < 2) {
      alert(
        "The number of questions must be at least 2 for the 'matching' type"
      );
      return;
    }

    const questionsPerOption: Record<string, number> = {};

    // Set at least 2 questions for matching if it is selected
    if (hasMatching) {
      questionsPerOption["matching"] = 2;
    }

    // Remaining questions after selecting at least 2 questions for matching
    let remainingQuestions =
      numQuestions - (questionsPerOption["matching"] || 0);

    // Number of question types to allocate remaining questions to
    const totalOptions = filteredOptions.length;

    // We distribute the remaining questions among all selected types
    const baseNumQuestionsPerOption = Math.floor(
      remainingQuestions / totalOptions
    );
    let remainder = remainingQuestions % totalOptions;

    filteredOptions.forEach((option) => {
      questionsPerOption[option] =
        (questionsPerOption[option] || 0) + baseNumQuestionsPerOption;
      if (remainder > 0) {
        questionsPerOption[option]++;
        remainder--;
      }
    });

    let currentIndex = 0;

    filteredOptions.forEach((option) => {
      const numQuestionsForOption = questionsPerOption[option] ?? 0;
      switch (option) {
        case "trueFalse":
          setTrueFalseTerms(
            shuffledTerms.slice(
              currentIndex,
              currentIndex + numQuestionsForOption
            )
          );
          break;
        case "multipleChoice":
          setMultipleChoiceTerms(
            shuffledTerms.slice(
              currentIndex,
              currentIndex + numQuestionsForOption
            )
          );
          break;
        case "matching":
          setMatchingTerms(
            shuffledTerms.slice(
              currentIndex,
              currentIndex + numQuestionsForOption
            )
          );
          break;
        case "written":
          setWrittenTerms(
            shuffledTerms.slice(
              currentIndex,
              currentIndex + numQuestionsForOption
            )
          );
          break;
        default:
          break;
      }
      currentIndex += numQuestionsForOption;
    });

    setStartTest(true);
  };

  if (isTestFinished) {
    return <Progressbar score={score} totalQuestions={questions} />;
  }

  return (
    <>
      {!isLoading && (
        <>
          {!startTest ? (
            <div className={styles.card}>
              <TestSettings
                questions={questions}
                setQuestions={setQuestions}
                trueFalse={trueFalse}
                setTrueFalse={setTrueFalse}
                multipleChoice={multipleChoice}
                setMultipleChoice={setMultipleChoice}
                matching={matching}
                setMatching={setMatching}
                written={written}
                setWritten={setWritten}
                setUpTest={setUpTest}
                name={module.name}
              />
            </div>
          ) : (
            <div className={styles.cards_wrapper}>
              {trueFalse && (
                <TrueFalse
                  trueFalseTerms={trueFalseTerms}
                  terms={module.terms}
                  setScore={setScore}
                  score={score}
                />
              )}
              {multipleChoice && (
                <MultipleChoice
                  multipleChoiceTerms={multipleChoiceTerms}
                  terms={module.terms}
                  setScore={setScore}
                  score={score}
                />
              )}

              {matching && (
                <Matching
                  terms={matchingTerms}
                  setScore={setScore}
                  score={score}
                />
              )}
              {written && (
                <Written
                  terms={writtenTerms}
                  setScore={setScore}
                  score={score}
                />
              )}
              <div className={styles.submit__btn}>
                <button onClick={() => setIsTestFinished(true)}>
                  Submit test
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Test;
