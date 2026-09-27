import Button from "react-bootstrap/Button";

/* stylesheet */
import "./solver.css";

interface Level {
  level: "easy" | "medium" | "hard" | "evil";
  variant: "success" | "primary" | "warning" | "danger";
}

const LEVELS: Level[] = [
  { level: "easy", variant: "success" },
  { level: "medium", variant: "primary" },
  { level: "hard", variant: "warning" },
  { level: "evil", variant: "danger" },
];

interface ControlPanelProps {
  loading: boolean;
  onGenerate: (level: string) => void;
  onSolve: () => void;
  onReset: () => void;
}

export default function ControlPanel({
  loading,
  onGenerate,
  onSolve,
  onReset,
}: ControlPanelProps) {
  return (
    <div id="control-panel" className="d-flex flex-column align-items-center">
      <div className="level-row">
        {LEVELS.map(({ level, variant }) => (
          <Button
            key={level}
            variant={variant}
            className="level-btn"
            disabled={loading}
            onClick={() => onGenerate(level)}
          >
            {level[0].toUpperCase() + level.slice(1)}
          </Button>
        ))}
      </div>
      <div className="action-row">
        <Button
          variant="outline-secondary"
          disabled={loading}
          onClick={onReset}
        >
          Reset
        </Button>
        <Button variant="dark" disabled={loading} onClick={onSolve}>
          Solve!
        </Button>
      </div>
    </div>
  );
}
