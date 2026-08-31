import "./Card.css";


function Card({ card, hidden = false }) {
  if (hidden) {
    return (
      <div className="card card--hidden" aria-label="Carta virada para baixo">
        <span className="card__back-pattern">?</span>
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
    <div className="card" title={`${card.value} de ${suitLabel}`}>
      <img
        className="card__image"
        src={card.image}
        alt={`${card.value} de ${suitLabel}`}
        loading="lazy"
      />
      <span className="card__caption">{suitLabel}</span>
    </div>
  );
}

export default Card;
