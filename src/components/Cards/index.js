import { Card } from "../Card";
import "./Cards.css";

const Cards = ({ cards, selectedCards, handleCardClick, isDisabled }) => {
  return (
    <div className="cards">
      {cards.map((card) => (
        <Card
          key={card.id + card.occurrence}
          card={card}
          handleCardClick={handleCardClick}
          flipped={
            (card.id === selectedCards.first?.id &&
              card.occurrence === selectedCards.first?.occurrence) ||
            (card.id === selectedCards.second?.id &&
              card.occurrence === selectedCards.second?.occurrence) ||
            card.isMatched
          }
          isDisabled={isDisabled}
        />
      ))}
    </div>
  );
};

export { Cards };
