import type { Card, CardFaction } from "./services/cards";

export type Player = "Player 1" | "Player 2";

export type Selection<T> = {
  player1: T;
  player2: T;
};

export type PlayerDeck = {
  cards: DeckCard[];
  faction: CardFaction;
};

export type DeckCard = {
  card: Card;
  copies: 1 | 2 | 3;
};

