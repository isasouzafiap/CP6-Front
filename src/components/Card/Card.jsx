function Card({ card, hidden = false }) {
  if (hidden) {
    return (
      <div
        className="w-[56px] sm:w-[76px] aspect-[5/7] rounded-lg border-[3px] border-panel
          flex items-center justify-center shadow-card
          bg-[repeating-linear-gradient(45deg,var(--color-accent),var(--color-accent)_6px,var(--color-accent-hover)_6px,var(--color-accent-hover)_12px)]"
        aria-label="Carta virada para baixo"
      >
        <span className="font-bold text-2xl text-accent-text">?</span>
      </div>
    );
  }

  const suitLabel = {
    HEARTS: "Copas",
    DIAMONDS: "Ouros",
    CLUBS: "Paus",
    SPADES: "Espadas",
  }[card.suit];

  return (
    <div
      className="flex flex-col items-center gap-1 w-[56px] sm:w-[76px] animate-card-deal"
      title={`${card.value} de ${suitLabel}`}
    >
      <img
        className="w-full rounded-md shadow-card bg-white"
        src={card.image}
        alt={`${card.value} de ${suitLabel}`}
        loading="lazy"
      />
      <span className="text-[0.65rem] tracking-wide uppercase text-text-muted">
        {suitLabel}
      </span>
    </div>
  );
}

export default Card;