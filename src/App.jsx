
import Header from "./components/Header/Header.jsx";
import GameTable from "./components/GameTable/GameTable.jsx";

import "./App.css";

const PLAYER_NAME = "isasouza";
const AUTHOR_NAME = "Isabelle Souza";


const TARGET_SCORE = 25;

const dealerHand = [
  {
    code: "2H",
    image: "https://deckofcardsapi.com/static/img/2H.png",
    value: "2",
    suit: "HEARTS",
  },
  {
    code: "3C",
    image: "https://deckofcardsapi.com/static/img/3C.png",
    value: "3",
    suit: "CLUBS",
  },
];

// Mock fixo da mão do jogador
const playerHand = [
  {
    code: "AH",
    image: "https://deckofcardsapi.com/static/img/AH.png",
    value: "ACE",
    suit: "HEARTS",
  },
  {
    code: "QD",
    image: "https://deckofcardsapi.com/static/img/QD.png",
    value: "QUEEN",
    suit: "DIAMONDS",
  },
];

// Placares e mensagem também fixos, só para preencher o layout
const MOCK_PLAYER_SCORE = 11;
const MOCK_DEALER_SCORE = 5;
const MOCK_MESSAGE = "Sua vez: escolha Hit, Stand ou reinicie a rodada";

function App() {  return (
    <div className="app" data-theme="dark">
      <div className="app__card">
        <Header
          playerName={PLAYER_NAME}
          authorName={AUTHOR_NAME}
          objective={`Fazer ${TARGET_SCORE} pontos`}
          topScore={MOCK_PLAYER_SCORE}
        />
        <GameTable
          dealerHand={dealerHand}
          playerHand={playerHand}
          dealerScore={MOCK_DEALER_SCORE}
          playerScore={MOCK_PLAYER_SCORE}
          message={MOCK_MESSAGE}
        />
      </div>
    </div>
  );
}

export default App;
