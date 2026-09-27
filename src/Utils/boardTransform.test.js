import {
  BOARD_SIZE,
  emptyBoard,
  boardToPuzzleString,
  puzzleStringToBoard,
} from "./boardTransform";

describe("emptyBoard", () => {
  it("returns a BOARD_SIZE x BOARD_SIZE grid of zeros", () => {
    const board = emptyBoard();
    expect(board).toHaveLength(BOARD_SIZE);
    board.forEach((row) => {
      expect(row).toHaveLength(BOARD_SIZE);
      expect(row.every((cell) => cell === 0)).toBe(true);
    });
  });

  it("returns independent row arrays", () => {
    const board = emptyBoard();
    board[0][0] = 5;
    expect(board[1][0]).toBe(0);
  });
});

describe("boardToPuzzleString / puzzleStringToBoard round trip", () => {
  it("round trips an empty board", () => {
    const board = emptyBoard();
    expect(puzzleStringToBoard(boardToPuzzleString(board))).toEqual(board);
  });

  it("round trips a partially filled board", () => {
    const board = emptyBoard();
    board[0][0] = 5;
    board[8][8] = 9;
    board[4][3] = 1;
    expect(puzzleStringToBoard(boardToPuzzleString(board))).toEqual(board);
  });

  it("joins the board row-major with commas", () => {
    const board = emptyBoard();
    board[0][1] = 7;
    expect(boardToPuzzleString(board).split(",")[1]).toBe("7");
  });
});

describe("puzzleStringToBoard", () => {
  it("treats non-numeric values as empty (0)", () => {
    const puzzle = Array(81).fill(".").join(",");
    const board = puzzleStringToBoard(puzzle);
    expect(board.flat().every((cell) => cell === 0)).toBe(true);
  });

  it("supports a custom board size", () => {
    const puzzle = "1,2,3,4";
    const board = puzzleStringToBoard(puzzle, 2);
    expect(board).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
