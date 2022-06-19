import "./Card.css";

const Card = ({ card, handleCardClick, flipped, isDisabled }) => {
  const { imgPath } = card;

  return (
    <div className="card">
      <div className={flipped ? "card-flipped" : ""}>
        <img src={imgPath} alt="Card" className="card__img card__front" />
        <img
          src="/course/flippity.png"
          alt="Hidden Card"
          className="card__img card__back"
          onClick={() => {
            if (!isDisabled) {
              handleCardClick(card);
            }
          }}
        />
      </div>
    </div>
  );
};

export { Card };
