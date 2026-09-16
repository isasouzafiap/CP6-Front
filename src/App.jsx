import { ThemeProvider } from "./context/ThemeContext.jsx";
import { GameProvider } from "./context/GameContext.jsx";
import Header from "./components/Header/Header.jsx";
import GameTable from "./components/GameTable/GameTable.jsx";

// O App não guarda mais estado nem lógica. Ele só monta os Providers
// (ThemeProvider e GameProvider), disponíveis pra qualquer componente
// da árvore usar via useTheme() / useGame() — sem prop drilling.
function App()
 {
  return (
    <ThemeProvider>
      <GameProvider>
        <div className="min-h-full flex items-center justify-center p-3 sm:p-6 bg-bg text-text font-body transition-colors duration-300">
          <div className="w-full max-w-[480px] rounded-lg overflow-hidden shadow-app">
            <Header />
            <GameTable />
          </div>
        </div>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
