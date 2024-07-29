import { Card } from "./Card";

export class Game {
  cards: Card[] = [];
  selectedCards: Card[] = [];

  constructor(contents: { id: number; term: string; definition: string }[]) {
    this.initializeGame(contents);
  }

  initializeGame(contents: { id: number; term: string; definition: string }[]) {
    this.cards = contents.flatMap((content) => [
      new Card(content.id * 2, content.term, "term"),
      new Card(content.id * 2 + 1, content.definition, "definition"),
    ]);
    this.shuffleCards();
  }

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  selectCard(card: Card) {
    if (this.selectedCards.length < 2 && !this.selectedCards.includes(card)) {
      this.selectedCards.push(card);
      card.active = true;
    }

    if (this.selectedCards.length === 2) {
      this.checkMatch();
    }
  }

  checkMatch() {
    const [card1, card2] = this.selectedCards;
    if (
      (card1.type === "term" &&
        card2.type === "definition" &&
        this.isMatchingPair(card1, card2)) ||
      (card2.type === "term" &&
        card1.type === "definition" &&
        this.isMatchingPair(card2, card1))
    ) {
      this.cards.forEach((card) => {
        if (card.id === card1.id || card.id === card2.id) {
          card.matched = true;
        }
      });
    }

    this.cards.forEach((card) => (card.active = false));
    this.selectedCards = [];
  }

  isMatchingPair(termCard: Card, definitionCard: Card) {
    return this.cards.some(
      (card) =>
        card.content === termCard.content &&
        card.type === "term" &&
        this.cards.some(
          (defCard) =>
            defCard.content === definitionCard.content &&
            defCard.type === "definition" &&
            defCard.id === card.id + 1
        )
    );
  }
}
