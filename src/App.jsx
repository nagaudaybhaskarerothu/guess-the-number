import { useState } from "react";
import "./App.css";

function App() {
  const [secretNumber, setSecretNumber] = useState(
    () => Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState(
    "Enter a number between 1 and 100"
  );
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  function handleGuess() {
    const number = Number(guess);

    if (guess === "" || !Number.isInteger(number) || number < 1 || number > 100) {
      setMessage("Please enter a valid number between 1 and 100!");
      return;
    }

    if (gameOver) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (number === secretNumber) {
      setMessage(`🎉 Correct! You guessed it in ${newAttempts} attempts!`);
      setGameOver(true);
      setWon(true);
    } else if (number < secretNumber) {
      setMessage("📈 Too low! Try a higher number.");
    } else {
      setMessage("📉 Too high! Try a lower number.");
    }

    setGuess("");
  }

  function restartGame() {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setAttempts(0);
    setMessage("Enter a number between 1 and 100");
    setGameOver(false);
    setWon(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleGuess();
    }
  }

  return (
    <div className="game-container">
      <div className="game-card">
        <div className="game-icon">🎯</div>

        <h1>Guess the Number</h1>

        <p className="subtitle">
          I'm thinking of a number between 1 and 100.
          <br />
          Can you guess it?
        </p>

        <div className="attempts-box">
          <span>Attempts</span>
          <strong>{attempts}</strong>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleGuess();
          }}
        >
          <input
            type="number"
            min="1"
            max="100"
            placeholder="Enter your guess"
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={gameOver}
          />

          <button
            type="submit"
            className="guess-button"
            disabled={gameOver}
          >
            Guess Number
          </button>
        </form>

        <div
          className={`message ${
            won ? "success" : gameOver ? "finished" : ""
          }`}
          aria-live="polite"
        >
          {message}
        </div>

        {gameOver && (
          <button className="restart-button" onClick={restartGame}>
            🔄 Play Again
          </button>
        )}

        
      </div>
    </div>
  );
}

export default App;