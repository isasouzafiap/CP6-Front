import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "../components/Button/Button.jsx";

function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/game" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Digite seu nome pra continuar.");
      return;
    }
    if (!password.trim()) {
      setError("Digite uma senha (qualquer uma, é só exemplo).");
      return;
    }

    const success = login(name);
    if (success) {
      navigate("/game");
    } else {
      setError("Não foi possível entrar. Tente de novo.");
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center p-3 sm:p-6 bg-bg text-text font-body transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] rounded-lg overflow-hidden shadow-app bg-table border border-table-border p-8"
      >
        <span className="block text-[0.65rem] tracking-widest uppercase text-accent mb-2 text-center">
          Blackjack Lounge
        </span>
        <h1 className="font-display text-2xl mb-6 text-center">Entrar</h1>

        <label className="block text-xs text-text-muted mb-1" htmlFor="name">
          Nome
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Seu nome"
          className="w-full rounded-md px-3 py-2 mb-4 bg-panel text-panel-text placeholder:text-panel-text/50 outline-none focus:ring-2 focus:ring-accent"
        />

        <label className="block text-xs text-text-muted mb-1" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Qualquer senha"
          className="w-full rounded-md px-3 py-2 mb-2 bg-panel text-panel-text placeholder:text-panel-text/50 outline-none focus:ring-2 focus:ring-accent"
        />

        {error && (
          <p className="text-[0.8rem] text-danger mb-4" role="alert">
            {error}
          </p>
        )}

        <Button label="Entrar" variant="primary" type="submit" />

        <p className="text-[0.7rem] text-text-muted mt-4 text-center">
          Esse login é só um exemplo didático — não guarda senha nenhuma de
          verdade, só o nome pra identificar o jogador.
        </p>
      </form>
    </div>
  );
}

export default LoginPage;