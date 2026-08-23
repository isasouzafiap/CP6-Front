import { useState, useCallback } from "react";
import Header from "./components/Header/Header.jsx";
import GameTable from "./components/GameTable/GameTable.jsx";
import { createFullDeck, shuffleDeck, calculateScore } from "./data/deck.js";
import "./App.css";

const PLAYER_NAME = "isa souza";
const AUTHOR_NAME = "Isabelle Souza";

// Monta um novo baralho embaralhado e distribui 2 cartas para cada lado
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

  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

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
    const nextScore = calculateScore(nextPlayerHand);

    setRound({ deck: nextDeck, playerHand: nextPlayerHand, dealerHand });

    if (nextScore > 21) {
      setIsRoundOver(true);
      setMessage("Estourou! Você passou de 21 — o dealer venceu.");
    } else if (nextScore === 21) {
      setIsRoundOver(true);
      setMessage("Você fez 21! Blackjack — você venceu!");
    }
  }, [isRoundOver, deck, playerHand, dealerHand]);

  const handleStand = useCallback(() => {
    if (isRoundOver) return;

    let nextDeck = [...deck];
    let nextDealerHand = [...dealerHand];

    // Dealer compra até chegar em 17 ou mais (regra clássica de cassino)
    while (calculateScore(nextDealerHand) < 17) {
      nextDealerHand = [...nextDealerHand, nextDeck.pop()];
    }

    const finalPlayerScore = calculateScore(playerHand);
    const finalDealerScore = calculateScore(nextDealerHand);

    setRound({ deck: nextDeck, playerHand, dealerHand: nextDealerHand });
    setIsRoundOver(true);

    if (finalDealerScore > 21) {
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
    <div className="app" data-theme={theme}>
      <div className="app__card">
        <Header
          playerName={PLAYER_NAME}
          authorName={AUTHOR_NAME}
          objective="Fazer 21 pontos"
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
