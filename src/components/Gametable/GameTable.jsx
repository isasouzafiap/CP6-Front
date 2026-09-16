import Card from "../Card/Card.jsx";
import Button from "../Button/Button.jsx";
import ScoreBoard from "../ScoreBoard/ScoreBoard.jsx";
import { useGame } from "../../context/GameContext.jsx";

function GameTable() {
  const {
    dealerHand,
    playerHand,
    dealerScore,
    playerScore,
    message,
    isRoundOver,
    hit,
    stand,
    newRound,
  } = useGame();

  const shouldHideDealerCard = (index) => index === 1 && !isRoundOver;

  return (
    <section className="bg-table border border-table-border rounded-b-lg px-5 pt-[18px] pb-[22px]">
      <ScoreBoard playerScore={playerScore} dealerScore={dealerScore} />

      <div className="bg-black/15 rounded-md px-3.5 pt-3 pb-4 mb-3.5">
        <span className="block text-[0.7rem] tracking-wider uppercase text-text-muted mb-2.5">
          Dealer
        </span>
        <div className="flex flex-wrap gap-2.5 min-h-[96px]">
          {dealerHand.map((card, index) => (
            <Card
              key={card.code + index}
              card={card}
              hidden={shouldHideDealerCard(index)}
            />
          ))}
        </div>
      </div>

      <div className="bg-black/15 rounded-md px-3.5 pt-3 pb-4 mb-3.5">
        <span className="block text-[0.7rem] tracking-wider uppercase text-text-muted mb-2.5">
          Jogador
        </span>
        <div className="flex flex-wrap gap-2.5 min-h-[96px]">
          {playerHand.map((card, index) => (
            <Card key={card.code + index} card={card} />
          ))}
        </div>
      </div>

      <p className="bg-accent/[0.12] border-l-[3px] border-accent text-text text-[0.85rem] px-3 py-2 rounded mb-4">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 [&>button]:w-full sm:[&>button]:w-auto">
        <Button label="Hit" variant="primary" onClick={hit} disabled={isRoundOver} />
        <Button label="Stand" variant="secondary" onClick={stand} disabled={isRoundOver} />
        <Button label="Nova rodada" variant="outline" onClick={newRound} />
      </div>
    </section>
  );
}

export default GameTable;
