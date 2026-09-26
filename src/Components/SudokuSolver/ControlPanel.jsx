/* Libraries */
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";

/* stylesheet */
import "./solver.css";

const LEVELS = ["easy", "medium", "hard", "evil"];

export default function ControlPanel({ loading, onGenerate, onSolve, onReset }) {
  return (
    <div
      id="control-panel"
      className="d-flex justify-content-center align-items-center flex-column mb-5"
    >
      <div className="d-flex justify-content-center align-items-center flex-row flex-wrap">
        {LEVELS.map((level) => (
          <Button
            key={uuidv4()}
            variant="dark"
            className="m-1"
            disabled={loading}
            onClick={() => onGenerate(level)}
          >
            {level[0].toUpperCase() + level.slice(1)}
          </Button>
        ))}
        <Button
          variant="secondary"
          className="m-1"
          disabled={loading}
          onClick={onReset}
        >
          Reset
        </Button>
        <Button
          variant="dark"
          className="m-1"
          disabled={loading}
          onClick={onSolve}
        >
          Solve!
        </Button>
      </div>
    </div>
  );
}
/* Styled Components */
