import { useNavigate } from "react-router-dom";
import Button from "../Button/Button.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useGame } from "../../context/GameContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const AUTHOR_NAME = "Isabelle Souza Lima";

function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { playerScore, targetScore } = useGame();
  const { playerName, logout } = useAuth();
  const isLight = theme === "light";

  const handleExit = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-table border border-table-border rounded-t-lg px-5 pt-4 pb-2.5 text-text">
      <div className="flex justify-between items-center text-xs text-text-muted mb-2.5">
        <span>Jogador: {playerName}</span>
        <Button label="Sair" variant="outline" onClick={handleExit} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2.5">
        <div>
          <span className="block text-[0.65rem] tracking-widest uppercase text-accent mb-0.5">
            Blackjack Lounge
          </span>
          <h1 className="flex items-center gap-2.5 font-display text-[1.8rem] m-0">
            <span className="bg-accent text-accent-text rounded-full w-8 h-8 flex items-center justify-center text-base">
              {playerScore}
            </span>
            Blackjack
          </h1>
        </div>

        <Button
          label={isLight ? "Trocar para tema escuro" : "Trocar para tema claro"}
          variant="ghost"
          onClick={toggleTheme}
        />
      </div>

      <div className="flex justify-between flex-wrap gap-1.5 mt-2.5 text-[0.72rem] text-text-muted">
        <span>By {AUTHOR_NAME}</span>
        <span className="bg-accent/[0.15] text-accent px-2.5 py-0.5 rounded-full">
          Objetivo da rodada: Fazer {targetScore} pontos
        </span>
      </div>
    </header>
  );
}

export default Header;