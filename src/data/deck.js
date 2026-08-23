// Mock de dados das cartas.
// Segue exatamente o mesmo formato do mock.json fornecido pelo professor:
// { code, image, images: { svg, png }, value, suit }
// As imagens vêm da mesma API pública usada no mock (deckofcardsapi.com),
// então não precisamos guardar 52 objetos "na mão": geramos o baralho
// completo programaticamente, reaproveitando a mesma estrutura.

const SUITS = [
  { name: "HEARTS", letter: "H" },
  { name: "DIAMONDS", letter: "D" },
  { name: "CLUBS", letter: "C" },
  { name: "SPADES", letter: "S" },
];

const VALUES = [
  { name: "ACE", letter: "A" },
  { name: "2", letter: "2" },
  { name: "3", letter: "3" },
  { name: "4", letter: "4" },
  { name: "5", letter: "5" },
  { name: "6", letter: "6" },
  { name: "7", letter: "7" },
  { name: "8", letter: "8" },
  { name: "9", letter: "9" },
  { name: "10", letter: "0" }, // a API usa "0" no código para o 10
  { name: "JACK", letter: "J" },
  { name: "QUEEN", letter: "Q" },
  { name: "KING", letter: "K" },
];

const BASE_URL = "https://deckofcardsapi.com/static/img";

function buildCard(value, suit) {
  const code = `${value.letter}${suit.letter}`;
  return {
    code,
    image: `${BASE_URL}/${code}.png`,
    images: {
      svg: `${BASE_URL}/${code}.svg`,
      png: `${BASE_URL}/${code}.png`,
    },
    value: value.name,
    suit: suit.name,
  };
}

// Gera as 52 cartas do baralho, no mesmo formato do mock.json
export function createFullDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push(buildCard(value, suit));
    }
  }
  return deck;
}

// Embaralha (Fisher-Yates) sem mutar o array original
export function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Valor numérico de uma carta para o Blackjack
// (Ás soma 11 por padrão; a redução para 1 é tratada em calculateScore)
export function cardValue(card) {
  if (card.value === "ACE") return 11;
  if (["JACK", "QUEEN", "KING"].includes(card.value)) return 10;
  return parseInt(card.value, 10);
}

// Soma os pontos de uma mão, ajustando Áses de 11 para 1 quando estoura o limite.
// maxScore é o teto da rodada (nesta versão do jogo, 25 pontos).
export function calculateScore(hand, maxScore = 21) {
  let score = hand.reduce((total, card) => total + cardValue(card), 0);
  let aces = hand.filter((card) => card.value === "ACE").length;

  while (score > maxScore && aces > 0) {
    score -= 10;
    aces -= 1;
  }

  return score;
}
