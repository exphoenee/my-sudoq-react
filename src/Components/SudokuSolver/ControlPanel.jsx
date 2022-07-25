/* Libraries */
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

/* Other imports */

/* stylesheet */
import "./solver.css";

/* Components */

export default function ControlPanel({
  solver,
  setCellValues,
  handleSolve,
  setApiSolver,
}) {
  return (
    <div
      id="control-panel"
      className="d-flex justify-content-center align-items-center flex-column mb-5"
    >
      <div className="d-flex justify-content-center align-items-center flex-row ">
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
          onClick={() => handleSolve()}
        >
          Solve!
        </Button>
      </div>
      <div className="mt-2 mb-5">
        <Form.Check
          onChange={(e) => setApiSolver(e.target.checked)}
          as="input"
          type="switch"
          id="solver-swicth"
          label="Using API for solve puzzle"
        />
      </div>
    </div>
  );
}
/* Styled Components */
