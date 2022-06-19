import {
  ACTIVATE_TIMER,
  DEACTIVATE_TIMER,
  DECREMENT_TIME,
  HAVE_COMPLETED_QUIZ,
  INCREMENT_SCORE,
  INCREMENT_TURNS,
  RESET_QUIZ,
  SET_QUIZ_DATA,
} from "../constants";

const quizReducer = (state, action) => {
  switch (action.type) {
    case ACTIVATE_TIMER:
      return { ...state, isTimerActive: true };
    case DEACTIVATE_TIMER:
      return { ...state, isTimerActive: false };
    case DECREMENT_TIME:
      return { ...state, time: state.time - 1 };
    case HAVE_COMPLETED_QUIZ:
      return { ...state, isTimerActive: false, haveCompleted: true };
    case INCREMENT_SCORE:
      return { ...state, score: state.score + 5 };
    case INCREMENT_TURNS:
      return { ...state, turns: state.turns + 1 };
    case RESET_QUIZ:
      return action.payload;
    case SET_QUIZ_DATA:
      return {
        ...state,
        index: action.payload.index,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export { quizReducer };
