import { RESET_QUIZ } from "../../constants";
import { useQuiz, useQuizzes } from "../../contexts";
import { Modal } from "../Modal";

const FailureModal = () => {
  const { quizzes } = useQuizzes();
  const { dispatchQuiz } = useQuiz();

  return (
    <Modal>
      <h2>Oops! 😔</h2>
      <p>Looks like the time is over.</p>
      <button
        className="modal-action__button"
        onClick={() =>
          dispatchQuiz({
            type: RESET_QUIZ,
            payload: {
              index: 0,
              data: [...quizzes[0]],
              turns: 0,
              score: 0,
              time: 180,
              isTimerActive: false,
              haveCompleted: false,
            },
          })
        }
      >
        Play again
      </button>
    </Modal>
  );
};

export { FailureModal };
