/* Libraries */
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";

/* Other imports */
import { Solver } from "../../Solver/Solver";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";

/* stylesheet */
import "./solver.css";

/* Components */
const solver = new Solver({ sectionSize: 3, renderMyself: false });

export default function SudokuSolver() {
  const board = Array(9).fill(Array(9).fill(0));
  const [cellValues, setCellValues] = useState(board);

  const handleChange = () => {
    return;
  };

  const solvePuzzle = () => {
    setCellValues(solver.solvePuzzle(cellValues));
  };

  useEffect(() => {}, [cellValues]);

  return (
    <Container className="mt-5 container-md w-75">
      <h1 className="text-center">SudoQ Solver</h1>
      <div id="board" style={boardStyle}>
        {board.map((row, y) => (
          <div key={uuidv4()} className={`row rowNr-${row}`}>
            {row.map((cell, x) => (
              <input
                key={uuidv4()}
                style={cellStyle}
                type="number"
                value={cellValues[y][x] > 1 ? cellValues[y][x] : ""}
                max="9"
                min="1"
                step="1"
                className="tile"
                onChange={() => handleChange}
              ></input>
            ))}
          </div>
        ))}
      </div>
      <div
        id="control-panel"
        className="d-flex justify-content-center align-items-center flex-row mb-5"
      >
        {Object.keys(solver.examples).map((text) => (
          <Button
            key={uuidv4()}
            variant="dark"
            className="m-1"
            onClick={() => setCellValues(solver.examples[text])}
          >
            {text}
          </Button>
        ))}
        <Button
          key={uuidv4()}
          variant="dark"
          className="m-1"
          onClick={() => solvePuzzle}
        >
          Solve!
        </Button>
      </div>
    </Container>
  );
}
/* Styled Components */
const cellStyle = {
  padding: "0px",
  margin: "0px",
  width: "3rem",
  height: "3rem",
  textAlign: "center",
  fontSize: "20px",
  fontWeight: "bold",
  justifyContent: "center",
  borderRadius: "0.5rem",
  alignItems: "center",
  transition: "all 0.5s linear,  text-align: center",
  boxShadow: "1px 2px 5px gray, inset 1px 2px 5px gray",
  outline: "none",
  border: "1px gray solid",
};
const boardStyle = {
  width: "calc((3rem + 2 * 1px) * 9 + 24px)",
  aspectRatio: "1",
  padding: "2rem",
  margin: "2rem auto",
  borderRadius: "2rem",
  backgroundImage:
    "linear-gradient(60deg,rgba(50, 50, 50, 0.2),rgba(150, 150, 150, 0.2))",
  boxShadow: "1px 3px 8px gray, inset 1px 3px 6px lightgray",
};
