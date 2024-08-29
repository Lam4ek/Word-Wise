import { useState } from "react";
import { ModuleData, TermData } from "../types/types";

export default function useTestSetup(module: ModuleData) {
  const [questions, setQuestions] = useState("");
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

  const setupTest = () => {
    if (Number(questions) > module.terms.length) {
      alert(
        `You have selected more questions (${questions}) than available terms (${module.terms.length}). Please reduce the number of questions.`
      );
      return;
    }
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

  const handleTestFinish = () => {
    setIsTestFinished(true);
  };

  return {
    startTest,
    isTestFinished,
    questions,
    score,
    handleTestFinish,
    setupTest,
    testConfig: {
      trueFalse,
      setTrueFalse,
      multipleChoice,
      setMultipleChoice,
      matching,
      setMatching,
      written,
      setWritten,
      trueFalseTerms,
      multipleChoiceTerms,
      matchingTerms,
      writtenTerms,
      setScore,
      setQuestions,
    },
  };
}
