import Button from "../Button/Button.jsx";
import "./Header.css";

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
    <header className="header">
      <div className="header__top">
        <span className="header__player">Jogador: {playerName}</span>
        <Button label="Sair" variant="outline" onClick={onExit} />
      </div>

      <div className="header__main">
        <div className="header__title-block">
          <span className="header__eyebrow">Blackjack Lounge</span>
          <h1 className="header__title">
            <span className="header__badge">{topScore}</span>
            Blackjack
          </h1>
        </div>

        <Button
          label={isLight ? "Trocar para tema escuro" : "Trocar para tema claro"}
          variant="ghost"
          onClick={onToggleTheme}
        />
      </div>

      <div className="header__bottom">
        <span className="header__author">By {authorName}</span>
        <span className="header__objective">
          Objetivo da rodada: {objective}
        </span>
      </div>
    </header>
  );
}

export default Header;
