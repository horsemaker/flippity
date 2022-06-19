import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";
import { CardFlipData } from "../data";

const QuizzesContext = createContext();

const quizzes = CardFlipData["Card-Flip"].map((quiz) =>
  quiz.imageSet.map((imgPath) => ({ id: uuid(), imgPath }))
);

const QuizzesProvider = ({ children }) => {
  return (
    <QuizzesContext.Provider value={{ quizzes }}>
      {children}
    </QuizzesContext.Provider>
  );
};

const useQuizzes = () => {
  const context = useContext(QuizzesContext);

  if (context === undefined) {
    throw new Error("useQuizzes must be used within a QuizzesProvider");
  }

  return context;
};

export { QuizzesProvider, useQuizzes };
