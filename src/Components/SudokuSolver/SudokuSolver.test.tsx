import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SudokuSolver from "./SudokuSolver";

vi.mock("../../api/sudokuApi");

beforeEach(() => {
  localStorage.clear();
});

describe("SudokuSolver", () => {
  it("renders the title and an empty 9x9 board", () => {
    render(<SudokuSolver />);
    expect(screen.getByText("XudoQ Solver")).toBeInTheDocument();
    expect(screen.getAllByRole("spinbutton")).toHaveLength(81);
  });

  it("keeps focus on the same cell after typing a digit", () => {
    render(<SudokuSolver />);
    const cell0 = document.getElementById("0") as HTMLInputElement;
    cell0.focus();
    fireEvent.change(cell0, { target: { value: "5" } });
    expect(cell0.value).toBe("5");
    expect(document.activeElement).toBe(cell0);
  });

  it("truncates a non-integer value instead of storing a decimal", () => {
    render(<SudokuSolver />);
    const cell0 = document.getElementById("0") as HTMLInputElement;
    fireEvent.change(cell0, { target: { value: "1.5" } });
    expect(cell0.value).toBe("1");
  });

  it("Reset clears a typed value", () => {
    render(<SudokuSolver />);
    const cell0 = document.getElementById("0") as HTMLInputElement;
    fireEvent.change(cell0, { target: { value: "5" } });
    expect(cell0.value).toBe("5");

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(cell0.value).toBe("");
  });
});
