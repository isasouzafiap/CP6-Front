import Card from "../Card/Card.jsx";
import Button from "../Button/Button.jsx";
import ScoreBoard from "../ScoreBoard/ScoreBoard.jsx";
import "./GameTable.css";


function GameTable({
  dealerHand,
  playerHand,
  dealerScore,
  playerScore,
  message,
  isRoundOver,
  onHit,
  onStand,
  onNewRound,
}) {

  const shouldHideDealerCard = (index) => index === 1 && !isRoundOver;

  return (
    <section className="game-table">
      <ScoreBoard playerScore={playerScore} dealerScore={dealerScore} />

      <div className="game-table__hand">
        <span className="game-table__hand-label">Dealer</span>
        <div className="game-table__cards">
          {dealerHand.map((card, index) => (
            <Card
              key={card.code + index}
              card={card}
              hidden={shouldHideDealerCard(index)}
            />
          ))}
        </div>
      </div>

      <div className="game-table__hand">
        <span className="game-table__hand-label">Jogador</span>
        <div className="game-table__cards">
          {playerHand.map((card, index) => (
            <Card key={card.code + index} card={card} />
          ))}
        </div>
      </div>

      <p className="game-table__message">{message}</p>

      <div className="game-table__actions">
        <Button label="Hit" variant="primary" onClick={onHit} disabled={isRoundOver} />
        <Button label="Stand" variant="secondary" onClick={onStand} disabled={isRoundOver} />
        <Button label="Nova rodada" variant="outline" onClick={onNewRound} />
      </div>
    </section>
  );
}

export default GameTable;
