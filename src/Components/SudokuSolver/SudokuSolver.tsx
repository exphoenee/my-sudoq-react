import type { ChangeEvent } from "react";
import Alert from "react-bootstrap/Alert";

/* Components */
import ControlPanel from "./ControlPanel";

/* Animation */
import FadeIn from "../FadeIn/FadeIn";

/* stylesheet */
import "./solver.css";

/* Hooks */
import useSudokuSolver from "../../hooks/useSudokuSolver";
import { BOARD_SIZE } from "../../Utils/boardTransform";

const isBoxEnd = (index: number) =>
  (index + 1) % 3 === 0 && index !== BOARD_SIZE - 1;

export default function SudokuSolver() {
  const {
    board,
    givenCells,
    message,
    loading,
    updateCell,
    solve,
    generate,
    reset,
  } = useSudokuSolver();

  const calculateId = (x: number, y: number) => y * BOARD_SIZE + x;

  const handleCellChange = (
    e: ChangeEvent<HTMLInputElement>,
    x: number,
    y: number
  ) => {
    const value = Math.trunc(+e.target.value);
    updateCell(x, y, value >= 1 && value <= BOARD_SIZE ? value : 0);
  };

  return (
    <FadeIn>
      <div className="sudoku-page">
        <h1 className="sudoku-title text-center">XudoQ Solver</h1>
        <p className="sudoku-subtitle text-center">
          Generate a puzzle by difficulty or fill in your own, then let the
          Sudoku Solver API do the rest.
        </p>
        <div id="board" role="grid" aria-label="Sudoku board">
          {board.map((row, y) => (
            <div
              key={`row-${y}`}
              className={`board-row${isBoxEnd(y) ? " box-end" : ""}`}
              role="row"
            >
              {row.map((cell, x) => {
                const given = givenCells.includes(`${calculateId(x, y)}`);
                return (
                  <input
                    key={`cell-${x}-${y}`}
                    id={`${calculateId(x, y)}`}
                    className={`tile${isBoxEnd(x) ? " box-end" : ""}${
                      given ? " given" : ""
                    }`}
                    type="number"
                    inputMode="numeric"
                    value={cell || ""}
                    max={BOARD_SIZE}
                    min="1"
                    step="1"
                    disabled={loading}
                    aria-label={`Row ${y + 1}, column ${x + 1}${
                      given ? ", given" : ""
                    }`}
                    onChange={(e) => handleCellChange(e, x, y)}
                  ></input>
                );
              })}
            </div>
          ))}
        </div>
        <Alert className="sudoku-message" variant={message.type}>
          {message.text}
        </Alert>
        <ControlPanel
          loading={loading}
          onGenerate={generate}
          onSolve={solve}
          onReset={reset}
        />
      </div>
    </FadeIn>
  );
}
