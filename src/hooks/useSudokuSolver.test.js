import { renderHook, act, waitFor } from "@testing-library/react";
import useSudokuSolver from "./useSudokuSolver";
import { generateSudoku, solveSudoku } from "../api/sudokuApi";
import { emptyBoard, BOARD_SIZE } from "../Utils/boardTransform";

jest.mock("../api/sudokuApi");

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("useSudokuSolver", () => {
  it("starts with an empty board when nothing is stored", () => {
    const { result } = renderHook(() => useSudokuSolver());
    expect(result.current.board).toEqual(emptyBoard());
    expect(result.current.givenCells).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it("restores a previously stored board and its given cells", () => {
    const stored = emptyBoard();
    stored[0][0] = 5;
    localStorage.setItem("items", JSON.stringify(stored));

    const { result } = renderHook(() => useSudokuSolver());
    expect(result.current.board[0][0]).toBe(5);
    expect(result.current.givenCells).toContain("0");
  });

  it("updateCell mutates a single cell and persists it", () => {
    const { result } = renderHook(() => useSudokuSolver());
    act(() => {
      result.current.updateCell(2, 3, 7);
    });
    expect(result.current.board[3][2]).toBe(7);
    expect(JSON.parse(localStorage.getItem("items"))[3][2]).toBe(7);
  });

  it("reset clears the board, given cells and message", () => {
    const { result } = renderHook(() => useSudokuSolver());
    act(() => {
      result.current.updateCell(0, 0, 9);
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.board).toEqual(emptyBoard());
    expect(result.current.givenCells).toEqual([]);
    expect(result.current.message.text).toBe("Let's solve sudoku!");
  });

  it("generate loads a puzzle from the API and marks given cells", async () => {
    const puzzle = "1," + "0,".repeat(BOARD_SIZE * BOARD_SIZE - 2) + "9";
    generateSudoku.mockResolvedValue({ puzzle });

    const { result } = renderHook(() => useSudokuSolver());
    act(() => {
      result.current.generate("easy");
    });
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.board[0][0]).toBe(1);
    expect(result.current.givenCells).toContain("0");
    expect(result.current.message.type).toBe("success");
  });

  it("generate surfaces the API error as the message", async () => {
    generateSudoku.mockRejectedValue(new Error("boom"));

    const { result } = renderHook(() => useSudokuSolver());
    await act(async () => {
      await result.current.generate("hard");
    });
    expect(result.current.message).toEqual({ text: "boom", type: "danger" });
    expect(result.current.loading).toBe(false);
  });

  it("solve replaces the board with the solved puzzle", async () => {
    const solution = "5," + "0,".repeat(BOARD_SIZE * BOARD_SIZE - 1);
    solveSudoku.mockResolvedValue(solution.slice(0, -1));

    const { result } = renderHook(() => useSudokuSolver());
    await act(async () => {
      await result.current.solve();
    });
    expect(result.current.board[0][0]).toBe(5);
    expect(result.current.message.type).toBe("success");
  });
});
