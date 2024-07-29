import React, { useEffect, useState } from "react";
import styles from "./Selection.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../Hooks";
import { Card } from "../../../../gameLogic/Selection/Card";
import { Game } from "../../../../gameLogic/Selection/Game";
import Header from "./Header";
import { FolderData, ModuleData } from "../../../../types/types";
import StartScreen from "./StartScreen";

const Selection: React.FC = () => {
  const { folderId, moduleId } = useParams<{
    folderId: string;
    moduleId: string;
  }>();

  const navigate = useNavigate();

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

  const [game, setGame] = useState<Game | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (module && folder) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [module, folder]);

  useEffect(() => {
    if (!isLoading && module && module.terms) {
      const selectedTerms = module.terms.slice(0, 6);
      const newGame = new Game(selectedTerms);
      setGame(newGame);
      setCards(newGame.cards);
    }
  }, [isLoading, module]);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (gameStarted && game && !isGameOver) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      return () => clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameStarted, game, isGameOver]);

  useEffect(() => {
    if (game) {
      const allCardsMatched = game.cards.every((card) => card.matched);
      if (allCardsMatched) {
        setIsGameOver(true);
        setGameStarted(false);
      }
    }
  }, [cards, game]);

  const handleCardClick = (card: Card) => {
    if (game && gameStarted && !isGameOver) {
      if (!card.active && !card.matched && game.selectedCards.length < 2) {
        game.selectCard(card);
        setCards([...game.cards]);
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const formatTime = (timeInMs: number) => {
    const seconds = Math.floor(timeInMs / 1000);
    const milliseconds = Math.floor((timeInMs % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.selection__container}>
      <Header onBackClick={handleGoBack} isGameOver={isGameOver}>
        {isGameOver
          ? `Time: ${formatTime(time)}`
          : gameStarted
          ? `Timer: ${formatTime(time)}`
          : `${module?.name}`}
      </Header>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {!gameStarted ? (
            <StartScreen handleStartGame={handleStartGame} />
          ) : (
            <div className={styles.memoryCard}>
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`${styles.card} ${
                    card.matched ? styles.matched : ""
                  } ${card.active ? styles.active : ""}`}
                  onClick={() => handleCardClick(card)}
                >
                  {!card.matched && card.content}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Selection;
