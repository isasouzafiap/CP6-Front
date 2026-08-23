
import "./ScoreBoard.css";


function ScoreBoard({ playerScore, dealerScore }) {
  return (
    <div className="scoreboard">
      <div className="scoreboard__panel">
        <span className="scoreboard__label">Jogador</span>
        <span className="scoreboard__value">{playerScore}</span>
      </div>
      <div className="scoreboard__panel">
        <span className="scoreboard__label">Dealer</span>
        <span className="scoreboard__value">{dealerScore}</span>
      </div>
    </div>
  );
}

export default ScoreBoard;