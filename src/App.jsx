import { useState, useCallback } from "react";
import Header from "./components/Header/Header.jsx";
import GameTable from "./components/GameTable/GameTable.jsx";
import { createFullDeck, shuffleDeck, calculateScore } from "./data/deck.js"
;
const TARGET_SCORE = 25;

const DEALER_STAND_SCORE = TARGET_SCORE - 4;

function dealNewRound() {
  const deck = shuffleDeck(createFullDeck());
  const playerHand = [deck.pop(), deck.pop()];
  const dealerHand = [deck.pop(), deck.pop()];
  return { deck, playerHand, dealerHand };
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [{ deck, playerHand, dealerHand }, setRound] = useState(dealNewRound);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [message, setMessage] = useState(
    "Sua vez: escolha Hit, Stand ou reinicie a rodada"
  );

  const playerScore = calculateScore(playerHand, TARGET_SCORE);
  const dealerScore = calculateScore(dealerHand, TARGET_SCORE);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const handleNewRound = useCallback(() => {
    setRound(dealNewRound());
    setIsRoundOver(false);
    setMessage("Sua vez: escolha Hit, Stand ou reinicie a rodada");
  }, []);

  const handleHit = useCallback(() => {
    if (isRoundOver) return;

    const nextDeck = [...deck];
    const nextCard = nextDeck.pop();
    const nextPlayerHand = [...playerHand, nextCard];
    const nextScore = calculateScore(nextPlayerHand, TARGET_SCORE);

    setRound({ deck: nextDeck, playerHand: nextPlayerHand, dealerHand });

    if (nextScore > TARGET_SCORE) {
      setIsRoundOver(true);
      setMessage(`Estourou! Você passou de ${TARGET_SCORE} — o dealer venceu.`);
    } else if (nextScore === TARGET_SCORE) {
      setIsRoundOver(true);
      setMessage(`Você fez ${TARGET_SCORE}! Você venceu!`);
    }
  }, [isRoundOver, deck, playerHand, dealerHand]);

  const handleStand = useCallback(() => {
    if (isRoundOver) return;

    let nextDeck = [...deck];
    let nextDealerHand = [...dealerHand];

   while (calculateScore(nextDealerHand, TARGET_SCORE) < DEALER_STAND_SCORE) {
      nextDealerHand = [...nextDealerHand, nextDeck.pop()];
    }

    const finalPlayerScore = calculateScore(playerHand, TARGET_SCORE);
    const finalDealerScore = calculateScore(nextDealerHand, TARGET_SCORE);

    setRound({ deck: nextDeck, playerHand, dealerHand: nextDealerHand });
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
  }, [isRoundOver, deck, playerHand, dealerHand]);

  return (
    <div
      data-theme={theme}
      className="min-h-full flex items-center justify-center p-3 sm:p-6 bg-bg text-text font-body transition-colors duration-300"
    >
      <div className="w-full max-w-[480px] rounded-lg overflow-hidden shadow-app">
        <Header
          playerName="Isabelle Souza"
          authorName="Isabelle Souza Lima"
          objective={`Fazer ${TARGET_SCORE} pontos`}
          topScore={playerScore}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onExit={() => setMessage("Até a próxima rodada!")}
        />
        <GameTable
          dealerHand={dealerHand}
          playerHand={playerHand}
          dealerScore={dealerScore}
          playerScore={playerScore}
          message={message}
          isRoundOver={isRoundOver}
          onHit={handleHit}
          onStand={handleStand}
          onNewRound={handleNewRound}
        />
      </div>
    </div>
  );
}

export default App;
