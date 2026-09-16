import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { createFullDeck, shuffleDeck, calculateScore } from "../data/deck.js";

const GameContext = createContext(null);

const TARGET_SCORE = 25;
const DEALER_STAND_SCORE = TARGET_SCORE - 4;

function dealNewRound() {
  const deck = shuffleDeck(createFullDeck());
  const playerHand = [deck.pop(), deck.pop()];
  const dealerHand = [deck.pop(), deck.pop()];
  return { deck, playerHand, dealerHand };
}

export function GameProvider({ children }) {
  const [round, setRound] = useState(dealNewRound);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [message, setMessage] = useState(
    "Sua vez: escolha Hit, Stand ou reinicie a rodada"
  );

  const { playerHand, dealerHand } = round;

  const playerScore = calculateScore(playerHand, TARGET_SCORE);
  const dealerScore = calculateScore(dealerHand, TARGET_SCORE);

  useEffect(() => {
    if (isRoundOver) return;

    if (playerScore > TARGET_SCORE) {
      setIsRoundOver(true);
      setMessage(`Estourou! Você passou de ${TARGET_SCORE} — o dealer venceu.`);
    } else if (playerScore === TARGET_SCORE) {
      setIsRoundOver(true);
      setMessage(`Você fez ${TARGET_SCORE}! Você venceu!`);
    }
  }, [playerScore, isRoundOver]);

  const hit = useCallback(() => {
    if (isRoundOver) return;
    setRound((prev) => {
      const nextDeck = [...prev.deck];
      const nextCard = nextDeck.pop();
      return {
        ...prev,
        deck: nextDeck,
        playerHand: [...prev.playerHand, nextCard],
      };
    });
  }, [isRoundOver]);

  const stand = useCallback(() => {
    if (isRoundOver) return;
    setRound((prev) => {
      let nextDeck = [...prev.deck];
      let nextDealerHand = [...prev.dealerHand];

      while (calculateScore(nextDealerHand, TARGET_SCORE) < DEALER_STAND_SCORE) {
        nextDealerHand = [...nextDealerHand, nextDeck.pop()];
      }

      const finalPlayerScore = calculateScore(prev.playerHand, TARGET_SCORE);
      const finalDealerScore = calculateScore(nextDealerHand, TARGET_SCORE);

      setIsRoundOver(true);
      if (finalDealerScore > TARGET_SCORE) {
        setMessage("O dealer estourou! Você venceu.");
      } else if (finalDealerScore > finalPlayerScore) {
        setMessage(`Dealer venceu com ${finalDealerScore} contra ${finalPlayerScore}.`);
      } else if (finalDealerScore < finalPlayerScore) {
        setMessage(`Você venceu com ${finalPlayerScore} contra ${finalDealerScore}!`);
      } else {
        setMessage(`Empate em ${finalPlayerScore} pontos.`);
      }

      return { deck: nextDeck, playerHand: prev.playerHand, dealerHand: nextDealerHand };
    });
  }, [isRoundOver]);

  const newRound = useCallback(() => {
    setRound(dealNewRound());
    setIsRoundOver(false);
    setMessage("Sua vez: escolha Hit, Stand ou reinicie a rodada");
  }, []);

  const value = {
    playerHand,
    dealerHand,
    playerScore,
    dealerScore,
    message,
    isRoundOver,
    targetScore: TARGET_SCORE,
    hit,
    stand,
    newRound,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame precisa ser usado dentro de um <GameProvider>");
  }
  return context;
}