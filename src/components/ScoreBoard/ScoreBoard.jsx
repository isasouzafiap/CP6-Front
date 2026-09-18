function ScoreBoard({ playerScore, dealerScore }) 
{
    return (
    <div className="flex gap-3 mb-3.5">
      <div className="flex-1 bg-panel text-panel-text rounded-md px-4 py-2.5 flex flex-col">
        <span className="text-[0.65rem] tracking-wider uppercase opacity-70">
          Jogador
        </span>
        <span className="text-2xl font-bold">{playerScore}</span>
      </div>
      <div className="flex-1 bg-panel text-panel-text rounded-md px-4 py-2.5 flex flex-col">
        <span className="text-[0.65rem] tracking-wider uppercase opacity-70">
          Dealer
        </span>
        <span className="text-2xl font-bold">{dealerScore}</span>
      </div>
    </div>
  );
}

export default ScoreBoard;