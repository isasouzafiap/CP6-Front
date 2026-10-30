function cardValue(card) {
  if (card.value === "ACE") return 11;
  if (["JACK", "QUEEN", "KING"].includes(card.value)) return 10;
  return parseInt(card.value, 10);
}

export function calculateScore(hand, maxScore = 21) {
  let score = hand.reduce((total, card) => total + cardValue(card), 0);
  let aces = hand.filter((card) => card.value === "ACE").length;

  while (score > maxScore && aces > 0) {
    score -= 10;
    aces -= 1;
  }

  return score;
}