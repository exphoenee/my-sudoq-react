/* Libraries */
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Alert from "react-bootstrap/Alert";

/* Components */
import ControlPanel from "./ControlPanel";

/* Animation */
import AnimatedPage from "../AnimatedPage/AnimatedPage";

/* stylesheet */
import "./solver.css";

/* Hooks */
import useSudokuSolver from "../../hooks/useSudokuSolver";
import { BOARD_SIZE } from "../../Utils/boardTransform";

const isBoxEnd = (index) => (index + 1) % 3 === 0 && index !== BOARD_SIZE - 1;

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

  const calculateId = (x, y) => y * BOARD_SIZE + x;

  const handleCellChange = (e, x, y) => {
    e.preventDefault();
    const value = +e.target.value;
    updateCell(x, y, value >= 1 && value <= BOARD_SIZE ? value : 0);
  };

  return (
    <AnimatedPage>
      <div className="sudoku-page">
        <h1 className="sudoku-title text-center">SudoQ Solver</h1>
        <p className="sudoku-subtitle text-center">
          Generate a puzzle by difficulty or fill in your own, then let the
          Sudoku Solver API do the rest.
        </p>
        <div id="board">
          {board.map((row, y) => (
            <div
              key={uuidv4()}
              className={`board-row${isBoxEnd(y) ? " box-end" : ""}`}
            >
              {row.map((cell, x) => {
                const given = givenCells.includes(`${calculateId(x, y)}`);
                return (
                  <input
                    key={uuidv4()}
                    id={`${calculateId(x, y)}`}
                    className={`tile${isBoxEnd(x) ? " box-end" : ""}${
                      given ? " given" : ""
                    }`}
                    type="number"
                    inputMode="numeric"
                    defaultValue={cell || ""}
                    max={BOARD_SIZE}
                    min="1"
                    step="1"
                    disabled={loading}
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
    </AnimatedPage>
  );
}
