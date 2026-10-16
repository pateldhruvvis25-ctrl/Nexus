import { useState } from "react";
import "./App.css";

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function getWinner(squares) {
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const result = getWinner(squares);
  const isDraw = !result && squares.every(Boolean);

  let status;
  if (result) status = `${result.player} wins!`;
  else if (isDraw) status = "It's a draw";
  else status = `Next player: ${xIsNext ? "X" : "O"}`;

  function handleClick(i) {
    if (squares[i] || result) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <p className="status">{status}</p>
      <div className="board">
        {squares.map((value, i) => (
          <button
            key={i}
            className={`square ${value || ""} ${result?.line.includes(i) ? "win" : ""}`}
            onClick={() => handleClick(i)}
            aria-label={`Square ${i + 1}${value ? `, ${value}` : ""}`}
          >
            {value}
          </button>
        ))}
      </div>
      <button className="reset" onClick={reset}>New game</button>
    </div>
  );
}
