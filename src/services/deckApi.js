const BASE_URL = "https://deckofcardsapi.com/api/deck";

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`A API de cartas respondeu com erro ${response.status}.`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "A API de cartas retornou um erro.");
  }

  return data;
}

// BUSCAR BARALHO: cria um baralho novo (1 baralho, já embaralhado).
export async function fetchNewDeck() {
  const data = await request("/new/shuffle/?deck_count=1");
  return { deckId: data.deck_id, remaining: data.remaining };
}

// EMBARALHAR CARTAS: reembaralha um baralho que já existe.
export async function shuffleDeck(deckId) {
  const data = await request(`/${deckId}/shuffle/`);
  return { deckId: data.deck_id, remaining: data.remaining };
}

// COMPRAR CARTAS PELA API: tira "count" cartas do topo do baralho.
export async function drawCards(deckId, count = 1) {
  const data = await request(`/${deckId}/draw/?count=${count}`);
  return data.cards;
}