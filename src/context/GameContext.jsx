import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { fetchNewDeck, shuffleDeck, drawCards } from "../services/deckApi.js";
import { calculateScore } from "../utils/score.js";

const GameContext = createContext(null);

const TARGET_SCORE = 25;
const DEALER_STAND_SCORE = TARGET_SCORE - 4;
// Se depois de embaralhar sobrarem menos cartas que isso, busca um baralho novo
const MIN_CARDS_TO_PLAY = 20;

const INITIAL_MESSAGE = "Sua vez: escolha Hit, Stand ou reinicie a rodada";
const EMPTY_HANDS = { playerHand: [], dealerHand: [] };

export function GameProvider({ children }) {
  // O baralho agora mora na API: aqui só guardamos o ID dele.
  const deckIdRef = useRef(null);
  // Evita que a resposta de uma chamada antiga sobrescreva uma mais nova
  const requestCounterRef = useRef(0);

  const [hands, setHands] = useState(EMPTY_HANDS);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [message, setMessage] = useState("Carregando o baralho...");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { playerHand, dealerHand } = hands;

  const playerScore = calculateScore(playerHand, TARGET_SCORE);
  const dealerScore = calculateScore(dealerHand, TARGET_SCORE);

  // Começa uma rodada: busca/embaralha o baralho na API e compra
  // 2 cartas pro jogador e 2 pro dealer.
  const startRound = useCallback(async () => {
    const requestId = ++requestCounterRef.current;

    setIsLoading(true);
    setError(null);
    setIsRoundOver(false);
    // Limpa as mãos antes, pra pontuação da rodada anterior não interferir
    setHands(EMPTY_HANDS);
    setMessage("Embaralhando as cartas...");

    try {
      let deckId = deckIdRef.current;

      if (deckId) {
        // Já temos um baralho: só embaralha de novo (EMBARALHAR CARTAS)
        try {
          const shuffled = await shuffleDeck(deckId);
          if (shuffled.remaining < MIN_CARDS_TO_PLAY) deckId = null;
        } catch {
          deckId = null; // baralho expirou ou deu erro: pega um novo
        }
      }

      if (!deckId) {
        // Não tem baralho ainda (BUSCAR BARALHO)
        const created = await fetchNewDeck();
        deckId = created.deckId;
      }

      // COMPRAR CARTAS PELA API: 4 cartas (2 pro jogador, 2 pro dealer)
      const cards = await drawCards(deckId, 4);

      if (requestId !== requestCounterRef.current) return; // resposta antiga

      deckIdRef.current = deckId;
      setHands({
        playerHand: [cards[0], cards[1]],
        dealerHand: [cards[2], cards[3]],
      });
      setMessage(INITIAL_MESSAGE);
    } catch (err) {
      if (requestId !== requestCounterRef.current) return;
      setError(
        `Não foi possível carregar as cartas. Detalhe: ${err.message} — clique em "Nova rodada" pra tentar de novo.`
      );
    } finally {
      if (requestId === requestCounterRef.current) setIsLoading(false);
    }
  }, []);

  // Ao abrir o jogo, busca o baralho e distribui a primeira rodada
  useEffect(() => {
    startRound();
  }, [startRound]);

  // Sempre que a pontuação do jogador mudar, verifica se estourou ou
  // fez a pontuação exata do alvo.
  useEffect(() => {
    if (isRoundOver || playerHand.length === 0) return;

    if (playerScore > TARGET_SCORE) {
      setIsRoundOver(true);
      setMessage(`Estourou! Você passou de ${TARGET_SCORE} — o dealer venceu.`);
    } else if (playerScore === TARGET_SCORE) {
      setIsRoundOver(true);
      setMessage(`Você fez ${TARGET_SCORE}! Você venceu!`);
    }
  }, [playerScore, playerHand.length, isRoundOver]);

  // HIT: compra 1 carta pro jogador direto da API
  const hit = useCallback(async () => {
    if (isRoundOver || isLoading || !deckIdRef.current) return;

    setIsLoading(true);
    setError(null);
    try {
      const [card] = await drawCards(deckIdRef.current, 1);
      setHands((prev) => ({ ...prev, playerHand: [...prev.playerHand, card] }));
    } catch (err) {
      setError(`Não foi possível comprar a carta. Detalhe: ${err.message} — tente de novo.`);
    } finally {
      setIsLoading(false);
    }
  }, [isRoundOver, isLoading]);

  // STAND: o dealer compra cartas da API até chegar no limite dele
  const stand = useCallback(async () => {
    if (isRoundOver || isLoading || !deckIdRef.current) return;

    setIsLoading(true);
    setError(null);
    try {
      let nextDealerHand = [...dealerHand];

      while (calculateScore(nextDealerHand, TARGET_SCORE) < DEALER_STAND_SCORE) {
        const [card] = await drawCards(deckIdRef.current, 1);
        nextDealerHand = [...nextDealerHand, card];
      }

      const finalPlayerScore = calculateScore(playerHand, TARGET_SCORE);
      const finalDealerScore = calculateScore(nextDealerHand, TARGET_SCORE);

      setHands({ playerHand, dealerHand: nextDealerHand });
      setIsRoundOver(true);

      if (finalDealerScore > TARGET_SCORE) {
        setMessage("O dealer estourou! Você venceu.");
      } else if (finalDealerScore > finalPlayerScore) {
        setMessage(`Dealer venceu com ${finalDealerScore} contra ${finalPlayerScore}.`);
      } else if (finalDealerScore < finalPlayerScore) {
        setMessage(`Você venceu com ${finalPlayerScore} contra ${finalDealerScore}!`);
      } else {
        setMessage(`Empate em ${finalPlayerScore} pontos.`);
      }
    } catch (err) {
      setError(`Não foi possível finalizar a rodada. Detalhe: ${err.message} — tente de novo.`);
    } finally {
      setIsLoading(false);
    }
  }, [isRoundOver, isLoading, dealerHand, playerHand]);

  const value = {
    playerHand,
    dealerHand,
    playerScore,
    dealerScore,
    message,
    isRoundOver,
    isLoading,
    error,
    targetScore: TARGET_SCORE,
    hit,
    stand,
    newRound: startRound,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame precisa ser usado dentro de um <GameProvider>");
  }
  return context;
}