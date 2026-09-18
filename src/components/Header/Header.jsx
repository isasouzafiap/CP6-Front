import Button from "../Button/Button.jsx";


function Header({
  playerName,
  authorName,
  objective,
  topScore,
  theme,
  onToggleTheme,
  onExit,
}) {
  const isLight = theme === "light";

  return (
    <header className="bg-table border border-table-border rounded-t-lg px-5 pt-4 pb-2.5 text-text">
      <div className="flex justify-between items-center text-xs text-text-muted mb-2.5">
        <span>Jogador: {playerName}</span>
        <Button label="Sair" variant="outline" onClick={onExit} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2.5">
        <div>
          <span className="block text-[0.65rem] tracking-widest uppercase text-accent mb-0.5">
            Blackjack Lounge
          </span>
          <h1 className="flex items-center gap-2.5 font-display text-[1.8rem] m-0">
            <span className="bg-accent text-accent-text rounded-full w-8 h-8 flex items-center justify-center text-base">
              {topScore}
            </span>
            Blackjack
          </h1>
        </div>

        <Button
          label={isLight ? "Trocar para tema escuro" : "Trocar para tema claro"}
          variant="ghost"
          onClick={onToggleTheme}
        />
      </div>

      <div className="flex justify-between flex-wrap gap-1.5 mt-2.5 text-[0.72rem] text-text-muted">
        <span>By {authorName}</span>
        <span className="bg-accent/[0.15] text-accent px-2.5 py-0.5 rounded-full">
          Objetivo da rodada: {objective}
        </span>
      </div>
    </header>
  );
}

export default Header;
