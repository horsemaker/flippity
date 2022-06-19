import { createContext, useContext, useEffect, useReducer } from "react";
import {
  DEACTIVATE_TIMER,
  DECREMENT_TIME,
  HAVE_COMPLETED_QUIZ,
  SET_QUIZ_DATA,
} from "../constants";
import { quizReducer } from "../reducers";
import { useQuizzes } from "./quizzes-context";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const { quizzes } = useQuizzes();

  const [quiz, dispatchQuiz] = useReducer(quizReducer, {
    index: 0,
    data: quizzes[0],
    turns: 0,
    score: 0,
    time: 180,
    isTimerActive: false,
    haveCompleted: false,
  });

  useEffect(() => {
    if (quiz.time === 0) return;
    let timeoutId;
    if (quiz.isTimerActive) {
      timeoutId = setTimeout(() => {
        const newTime = quiz.time - 1;
        if (newTime === 0) dispatchQuiz({ type: DEACTIVATE_TIMER });
        dispatchQuiz({ type: DECREMENT_TIME });
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [quiz.time, quiz.isTimerActive]);

  useEffect(() => {
    if (quiz.score % 30 === 0 && quiz.score !== 0) {
      if (quizzes[quiz.index + 1] !== undefined) {
        dispatchQuiz({
          type: SET_QUIZ_DATA,
          payload: { index: quiz.index + 1, data: quizzes[quiz.index + 1] },
        });
      }
      if (quiz.score === quizzes.length * 30) {
        dispatchQuiz({ type: HAVE_COMPLETED_QUIZ });
      }
    }
  }, [quiz.score, quiz.index, quizzes]);

  return (
    <QuizContext.Provider value={{ quiz, dispatchQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);

  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }

  return context;
};

export { QuizProvider, useQuiz };
