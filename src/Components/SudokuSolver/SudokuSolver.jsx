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

/* Animation */
import AnimatedPage from "../AnimatedPage/AnimatedPage";

/* stylesheet */
import "./solver.css";

/* Sudoku solver */
import { Solver } from "../../Solver/Solver";

/* Other imports */
import { success, danger, light, info } from "../../Utils/MessageTypes";

const solver = new Solver({});
const boxSize = 3;
const sudokuSize = boxSize ** 2;
const boxGap = "0.5rem";

export default function SudokuSolver() {
  const board = Array(sudokuSize).fill(Array(sudokuSize).fill(0));
  const [cellValues, setCellValues] = useState(() => {
    let oldBoard = JSON.parse(localStorage.getItem("items"));
    if (oldBoard) {
      return oldBoard;
    }
    return board;
  });
  const [givenCells, setGivenCells] = useState([]);
  const [apiSolver, setApiSolver] = useState(false);
  const [message, setMessage] = useState({
    text: "Let's solve sudoku!",
    type: light,
  });

  const validateValue = (value, unfilledValue = "") => {
    return +value >= 1 && +value <= sudokuSize ? +value : unfilledValue;
  };

  const calculateId = (x, y) => {
    return y * sudokuSize + x;
  };

  const cloneCellValues = () => {
    return cellValues.map((row) => row.map((elem) => elem));
  };

  const handleCellChange = (e, x, y) => {
    e.preventDefault();
    /*it's strange I couldn't make a clon with
        ** let newBoard = [...cellValues]
      syntax, therefore I made a double times mapped array.
      Te last try would be the
        ** let newBoard = JSON.parse(JSON.stringify(cellValues)) */
    let newBoard = cloneCellValues();
    newBoard[y][x] = validateValue(+e.target.value, "");
    setCellValues(newBoard);
  };

  const handleSolve = () => {
    let solveFailed;

    cellValues.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (validateValue(cell, 0) !== 0) {
          console.log(cell, x, y);
          setGivenCells([...givenCells.map((c) => c), `${calculateId(x, y)}`]);
        }
      })
    );

    setMessage({
      text: "...solving...",
      type: info,
    });

    let sovlable;
    if (apiSolver) {
      const puzzle = cellValues
        .map((row) => row.join(""))
        .join("")
        .replace(/0/g, ".");

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
          solveFailed = true;
          setMessage({
            text: "Some error occured with the API! Check your API key!",
            type: danger,
          });
          console.error(error);
        });
    } else {
      const puzzle = cloneCellValues();
      const solution = solver.solvePuzzle(puzzle);
      if (solution === false) {
        solveFailed = true;
      } else if (Array.isArray(solution)) {
        setCellValues(solution);
      }
    }

    if (sovlable) {
      setMessage({ text: "Puzzle solved!", type: success });
    } else if (solveFailed) {
      setMessage({
        text: "There is no solution for this puzzle!",
        type: danger,
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(cellValues));
    setMessage({
      text: "Let's solve sudoku!",
      type: light,
    });
  }, [cellValues]);

  return ( <AnimatedPage>
    <Container className="mt-5 container-md w-75">
      <h1 className="text-center">SudoQ Solver</h1>
      <div id="board" style={boardStyle}>
        {board.map((row, y) => (
          <div key={uuidv4()} className={`row rowNr-${y}`} style={rowStyle(y)}>
            {row.map((cell, x) => (
              <input
                key={uuidv4()}
                id={calculateId(x, y)}
                style={cellStyle(x, givenCells.includes(calculateId(x, y)))}
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
    </Container> </AnimatedPage>
  );
}
/* Styled Components */

const boardStyle = {
  width: "calc((3rem + 2 * 1px) * 9 + 48px)",
  aspectRatio: "1",
  padding: "2rem",
  margin: "2.5rem auto",
  borderRadius: "2rem",
  backgroundImage:
    "linear-gradient(60deg,rgba(50, 50, 50, 0.2),rgba(150, 150, 150, 0.2))",
  boxShadow: "1px 3px 8px gray, inset 1px 3px 6px lightgray",
};

const rowStyle = (rowNr) => {
  if ((rowNr + 1) % 3 === 0 && rowNr !== sudokuSize) {
    return { marginBottom: boxGap };
  }
};

const cellStyle = (colNr, given) => {
  let styles = {
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
  if ((colNr + 1) % 3 === 0 && colNr !== sudokuSize) {
    styles.marginRight = boxGap;
  }
  if (given) {
    styles.backgroundColor = "gray";
  }
  return styles;
};
