import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function HomePage() {
  const { isLoggedIn, playerName } = useAuth();

  return (
    <div className="min-h-full flex items-center justify-center p-3 sm:p-6 bg-bg text-text font-body transition-colors duration-300">
      <div className="w-full max-w-[480px] rounded-lg overflow-hidden shadow-app bg-table border border-table-border p-8 text-center">
        <span className="block text-[0.65rem] tracking-widest uppercase text-accent mb-2">
          Blackjack Lounge
        </span>
        <h1 className="font-display text-3xl mb-4">Bem-vindo(a)!</h1>
        <p className="text-sm text-text-muted mb-8">
          Um joguinho de Blackjack feito em React. Faça login pra começar a
          jogar — o objetivo é somar cartas sem ultrapassar 25 pontos.
        </p>

        {isLoggedIn ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-text-muted">
              Você já está logado(a) como <strong className="text-text">{playerName}</strong>.
            </p>
            <Link
              to="/game"
              className="rounded-full px-[22px] py-2.5 text-[0.85rem] font-semibold bg-accent text-accent-text hover:brightness-110 transition"
            >
              Ir para o jogo
            </Link>
          </div>
        ) : (
          <Link
            to="/login"
            className="inline-block rounded-full px-[22px] py-2.5 text-[0.85rem] font-semibold bg-accent text-accent-text hover:brightness-110 transition"
          >
            Entrar
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomePage;