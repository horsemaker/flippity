import { useEffect, useState } from "react";
import { Cards, FailureModal, SuccessModal } from "../../../components";
import {
  DEACTIVATE_TIMER,
  INCREMENT_SCORE,
  INCREMENT_TURNS,
} from "../../../constants";
import { useQuiz } from "../../../contexts";
import { fisherYatesShuffler } from "./../../../utils";
import "./Quiz.css";
import { ACTIVATE_TIMER } from "./../../../constants/quiz-constants";

const Quiz = () => {
  const { quiz } = useQuiz();

  const [currentCards, setCurrentCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState({
    first: null,
    second: null,
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const { dispatchQuiz } = useQuiz();

  useEffect(() => {
    setCurrentCards(() =>
      fisherYatesShuffler([
        ...quiz.data.map((card) => ({
          ...card,
          occurrence: 1,
          isMatched: false,
        })),
        ...quiz.data.map((card) => ({
          ...card,
          occurrence: 2,
          isMatched: false,
        })),
      ])
    );
    dispatchQuiz({ type: DEACTIVATE_TIMER });
    setIsDisabled(true);
    const timeoutIdOne = setTimeout(
      () =>
        setCurrentCards((prevCurrentCards) =>
          prevCurrentCards.map((card) => ({ ...card, isMatched: true }))
        ),
      1250
    );
    const timeoutIdTwo = setTimeout(() => {
      setCurrentCards((prevCurrentCards) =>
        prevCurrentCards.map((card) => ({ ...card, isMatched: false }))
      );
      setIsDisabled(false);
      dispatchQuiz({ type: ACTIVATE_TIMER });
    }, 5000);

    return () => {
      clearTimeout(timeoutIdOne);
      clearTimeout(timeoutIdTwo);
    };
  }, [quiz.data, dispatchQuiz]);

  useEffect(() => {
    let timeoutIdOne, timeoutIdTwo;
    if (selectedCards.first && selectedCards.second) {
      setIsDisabled(true);
      const resetTurn = () => {
        setSelectedCards({ ...selectedCards, first: null, second: null });
        dispatchQuiz({ type: INCREMENT_TURNS });
        setIsDisabled(false);
      };

      if (selectedCards.first.id === selectedCards.second.id) {
        setCurrentCards((prevCurrentCards) =>
          prevCurrentCards.map((card) =>
            card.id === selectedCards.first.id
              ? { ...card, isMatched: true }
              : card
          )
        );
        timeoutIdOne = setTimeout(() => {
          resetTurn();
          dispatchQuiz({ type: INCREMENT_SCORE });
        }, 1000);
      } else {
        timeoutIdTwo = setTimeout(() => resetTurn(), 1000);
      }
    }

    return () => {
      clearTimeout(timeoutIdOne);
      clearTimeout(timeoutIdTwo);
    };
  }, [selectedCards, dispatchQuiz]);

  const handleCardClick = (card) => {
    selectedCards.first
      ? setSelectedCards({ ...selectedCards, second: card })
      : setSelectedCards({ ...selectedCards, first: card });
  };

  return (
    <div className="quiz">
      <Cards
        cards={currentCards}
        selectedCards={selectedCards}
        handleCardClick={handleCardClick}
        isDisabled={isDisabled}
      />
      {quiz.haveCompleted && <SuccessModal />}
      {quiz.time === 0 && <FailureModal />}
    </div>
  );
};

export { Quiz };
