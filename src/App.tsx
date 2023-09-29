import { useState } from "react";
import {
  CollectionDialog,
  Deck,
  Mulligan,
  PlayerSelection,
  Toolbar,
} from "./components";
import { useDecks } from "./use-decks";
import { useMulliganCards } from "./use-mulligan-cards";

import type { PlayerDeck, Selection } from "./domain";
import type { Card, CardFaction } from "./services/cards";

export function App() {
  const { player1Deck, player2Deck, addCardsToDecks, setFactions } = useDecks();
  const { currentCards, mulligan } = useMulliganCards();
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);

  const appState = () => {
    return player1Deck.faction && player2Deck.faction
      ? "deck-building"
      : "player-selection";
  };

  const handleShowCollection = () => {
    setShowCollectionDialog(true);
  };

  const handleFactionsSelected = (selection: Selection<CardFaction>) => {
    setFactions(selection);
    mulligan(selection.player1, selection.player2);
  };

  const handleCardsSelected = (selection: Selection<Card>) => {
    if (!player1Deck.faction || !player2Deck.faction) {
      console.error(
        "STATE ERROR: can't select cards if factions aren't selected"
      );
      return;
    }
    addCardsToDecks(selection);
    mulligan(player1Deck.faction, player2Deck.faction);
  };

  return (
    <div className="flex flex-col h-screen">
      <Toolbar onCollection={handleShowCollection} />
      <main className="flex flex-grow">
        {appState() === "player-selection" && (
          <PlayerSelection onReady={handleFactionsSelected} />
        )}
        {appState() === "deck-building" && (
          <div className="flex">
            <Deck className="w-1/6" playerDeck={player1Deck as PlayerDeck} />
            <Mulligan
              className="w-4/6"
              cards={currentCards}
              onCardsSelected={handleCardsSelected}
            />
            <Deck className="w-1/6" playerDeck={player2Deck as PlayerDeck} />
          </div>
        )}
      </main>
      {showCollectionDialog && (
        <CollectionDialog onClose={() => setShowCollectionDialog(false)} />
      )}
    </div>
  );
}
