import { createContext, useContext, useState, useCallback, useEffect } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "blackjack-lounge:player-name";

export function AuthProvider({ children }) {
  const [playerName, setPlayerName] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPlayerName(saved);
    }
  }, []);

  const login = useCallback((name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return false;

    setPlayerName(trimmedName);
    sessionStorage.setItem(STORAGE_KEY, trimmedName);
    return true;
  }, []);

  const logout = useCallback(() => {
    setPlayerName(null);
    sessionStorage.removeItem(STORAGE_KEY);
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