/* Libraries */
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "react-bootstrap/Container";
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

const boxGap = "0.5rem";

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
      <Container className="mt-5 container-md w-75">
        <h1 className="text-center">SudoQ Solver</h1>
        <div id="board" style={boardStyle}>
          {board.map((row, y) => (
            <div
              key={uuidv4()}
              className={`row rowNr-${y}`}
              style={rowStyle(y)}
            >
              {row.map((cell, x) => (
                <input
                  key={uuidv4()}
                  id={`${calculateId(x, y)}`}
                  style={cellStyle(
                    x,
                    givenCells.includes(`${calculateId(x, y)}`)
                  )}
                  type="number"
                  defaultValue={cell || ""}
                  max={BOARD_SIZE}
                  min="1"
                  step="1"
                  className={`tile col-${x}`}
                  disabled={loading}
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
          loading={loading}
          onGenerate={generate}
          onSolve={solve}
          onReset={reset}
        />
      </Container>
    </AnimatedPage>
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
  if ((rowNr + 1) % 3 === 0 && rowNr !== BOARD_SIZE) {
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
  if ((colNr + 1) % 3 === 0 && colNr !== BOARD_SIZE) {
    styles.marginRight = boxGap;
  }
  if (given) {
    styles.backgroundColor = "gray";
  }
  return styles;
};
