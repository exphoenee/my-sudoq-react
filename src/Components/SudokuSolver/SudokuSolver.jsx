/* Libraries */
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
/* Components */
import ControlPanel from "./ControlPanel";
import env from "react-dotenv";

/* stylesheet */
import "./solver.css";

/* Sudoku solver */
import { Solver } from "../../Solver/Solver";

/* Other imports */
import { success, danger, light, info } from "../../Utils/MessageTypes";

const solver = new Solver({ sectionSize: 3, renderMyself: false });

export default function SudokuSolver() {
  const boxSize = 3;
  const sudokuSize = boxSize ** 2;
  const board = Array(sudokuSize).fill(Array(sudokuSize).fill(0));
  const [cellValues, setCellValues] = useState(board);
  const [apiSolver, setApiSolver] = useState(false);
  const [message, setMessage] = useState({
    text: "Let's solve sudoku!",
    type: light,
  });

  const validateValue = (value, unfilledValue = "") => {
    return +value >= 1 && +value <= sudokuSize ? +value : unfilledValue;
  };

  const handleCellChange = (e, x, y) => {
    e.preventDefault();
    /*it's strange I couldn't make a clon with
        ** let newBoard = [...cellValues]
      syntax, therefore I made a double times mapped array.
      Te last try would be the
        ** let newBoard = JSON.parse(JSON.stringify(cellValues)) */
    let newBoard = cellValues.map((row) => row.map((elem) => elem));
    newBoard[y][x] = validateValue(+e.target.value, "");
    setCellValues(newBoard);
  };

  const handleSolve = () => {
    const puzzle = cellValues
      .map((row) => row.join(""))
      .join("")
      .replace(/0/g, ".");

    console.log(puzzle);

    setMessage({
      text: "...solving...",
      type: info,
    });

    let sovlable;
    if (apiSolver) {
      const options = {
        method: "POST",
        url: "https://solve-sudoku.p.rapidapi.com/",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": env.SUDOKUAPI,
          "X-RapidAPI-Host": "solve-sudoku.p.rapidapi.com",
        },
        data: { puzzle },
      };

      axios
        .request(options)
        .then(function (res) {
          sovlable = res.data.sovlable;

          const solution = res.data.solution;
          setCellValues(solution);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      const solution = solver.solvePuzzle(cellValues);
      setCellValues(solution);
    }

    if (sovlable) {
      setMessage({ text: "Puzzle solved!", type: success });
    } else {
      setMessage({
        text: "There is no solution for this puzzle!",
        type: danger,
      });
    }
  };

  useEffect(() => {
    setMessage({
      text: "Let's solve sudoku!",
      type: light,
    });
    console.log(cellValues);
  }, [cellValues]);

  return (
    <Container className="mt-5 container-md w-75">
      <h1 className="text-center">SudoQ Solver</h1>
      <div id="board" style={boardStyle}>
        {board.map((row, y) => (
          <div key={uuidv4()} className={`row rowNr-${y}`}>
            {row.map((cell, x) => (
              <input
                key={uuidv4()}
                id={y * sudokuSize + x}
                style={cellStyle}
                type="number"
                defaultValue={validateValue(cellValues[y][x], "")}
                max={sudokuSize}
                min="1"
                step="1"
                className={`tile col-${x}`}
                onChange={(e) => handleCellChange(e, x, y)}
              ></input>
            ))}
          </div>
        ))}
      </div>
      <div className="w-50 mx-auto">
        <Alert className="text-center" variant={message.type}>
          {message.text}
        </Alert>
      </div>
      <ControlPanel
        solver={solver}
        setCellValues={setCellValues}
        handleSolve={handleSolve}
        setApiSolver={setApiSolver}
      />
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
  margin: "2.5rem auto",
  borderRadius: "2rem",
  backgroundImage:
    "linear-gradient(60deg,rgba(50, 50, 50, 0.2),rgba(150, 150, 150, 0.2))",
  boxShadow: "1px 3px 8px gray, inset 1px 3px 6px lightgray",
};
