/* Pure formatting helpers to move a puzzle between the board's 2D array
   shape and the comma separated string shape the API speaks. No sudoku
   rules live here - that stays on the API side. */

export type Board = number[][];

export const BOARD_SIZE = 9;

export const emptyBoard = (): Board =>
  Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));

export function boardToPuzzleString(board: Board): string {
  return board.flat().join(",");
}

export function puzzleStringToBoard(puzzle: string, size = BOARD_SIZE): Board {
  const values = puzzle.split(",").map((value) => Number(value) || 0);
  return Array.from({ length: size }, (_, row) =>
    values.slice(row * size, row * size + size)
  );
}
