import { useState, useEffect } from "react";
import styles from "./StudyTest.module.css";
import TestSettings from "./TestConfiguration/TestSettings";
import Matching from "./TestConfiguration/TestConditions/Matching";
import TrueFalse from "./TestConfiguration/TestConditions/TrueFalse";

import Written from "./TestConfiguration/TestConditions/Written/Written";

import Progressbar from "../../../../ui/Progressbar";
import MultipleChoice from "./TestConfiguration/TestConditions/MultipleChoise";
import useTestSetup from "../../../../Hooks/useTestSetup";
import { useModuleData } from "../../../../Hooks/useModuleData";

function Test() {
  const [isLoading, setIsLoading] = useState(true);

  const { module, folder } = useModuleData();

  const {
    startTest,
    isTestFinished,
    questions,
    score,
    handleTestFinish,
    setupTest,
    testConfig,
  } = useTestSetup(module);

  useEffect(() => {
    if (module && folder) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [module, folder]);

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
                setQuestions={testConfig.setQuestions}
                trueFalse={testConfig.trueFalse}
                setTrueFalse={testConfig.setTrueFalse}
                multipleChoice={testConfig.multipleChoice}
                setMultipleChoice={testConfig.setMultipleChoice}
                matching={testConfig.matching}
                setMatching={testConfig.setMatching}
                written={testConfig.written}
                setWritten={testConfig.setWritten}
                setUpTest={setupTest}
                name={module.name}
              />
            </div>
          ) : (
            <div className={styles.cards_wrapper}>
              {testConfig.trueFalse && (
                <TrueFalse
                  trueFalseTerms={testConfig.trueFalseTerms}
                  terms={module.terms}
                  setScore={testConfig.setScore}
                  score={score}
                />
              )}
              {testConfig.multipleChoice && (
                <MultipleChoice
                  multipleChoiceTerms={testConfig.multipleChoiceTerms}
                  terms={module.terms}
                  setScore={testConfig.setScore}
                  score={score}
                />
              )}

              {testConfig.matching && (
                <Matching
                  terms={testConfig.matchingTerms}
                  setScore={testConfig.setScore}
                  score={score}
                />
              )}
              {testConfig.written && (
                <Written
                  terms={testConfig.writtenTerms}
                  setScore={testConfig.setScore}
                  score={score}
                />
              )}
              <div className={styles.submit__btn}>
                <button onClick={handleTestFinish}>Submit test</button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Test;
