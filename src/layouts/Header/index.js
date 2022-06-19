import { useQuiz } from "../../contexts";
import "./Header.css";

const Header = () => {
  const { quiz } = useQuiz();

  return (
    <header className="header">
      <div className="header__heading">
        <img
          className="header__heading-img"
          src="/assets/flippity-logo.svg"
          alt="Flippity"
        />
        <h1 className="header__heading-text">Flippity</h1>
      </div>
      <div className="header__stats">
        <span className="header__stat">Turns: {quiz.turns}</span>
        <span className="header__stat">Score: {quiz.score}</span>
        <span className="header__stat">Time: {quiz.time}</span>
      </div>
    </header>
  );
};

export { Header };
