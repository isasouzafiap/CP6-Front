import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "blackjack-lounge:player-name";

export function AuthProvider({ children }) {
  const [playerName, setPlayerName] = useState(() =>
    localStorage.getItem(STORAGE_KEY)
  );

  const login = useCallback((name, password) => {
    const trimmedName = name.trim();
    if (!trimmedName) return false;

    if (password !== import.meta.env.VITE_GAME_PASSWORD) return false;

    setPlayerName(trimmedName);
    localStorage.setItem(STORAGE_KEY, trimmedName);
    return true;
  }, []);

  const logout = useCallback(() => {
    setPlayerName(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = {
    playerName,
    isLoggedIn: Boolean(playerName),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth precisa ser usado dentro de um <AuthProvider>");
  }
  return context;
}