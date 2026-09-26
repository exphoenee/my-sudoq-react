import { useCallback, useEffect, useState } from "react";
import { generateSudoku, solveSudoku } from "../api/sudokuApi";
import {
  BOARD_SIZE,
  boardToPuzzleString,
  emptyBoard,
  puzzleStringToBoard,
} from "../Utils/boardTransform";
import { success, danger, light, info } from "../Utils/MessageTypes";

const STORAGE_KEY = "items";

const readStoredBoard = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : emptyBoard();
  } catch {
    return emptyBoard();
  }
};

const calculateGivenCells = (board) => {
  const given = [];
  board.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell) given.push(`${y * BOARD_SIZE + x}`);
    })
  );
  return given;
};

/* Owns all sudoku board state for the UI. Every solve/generate call is
   delegated to the SudokuSolver-API - this hook holds no puzzle logic. */
export default function useSudokuSolver() {
  const [board, setBoard] = useState(readStoredBoard);
  const [givenCells, setGivenCells] = useState(() =>
    calculateGivenCells(readStoredBoard())
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    text: "Let's solve sudoku!",
    type: light,
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  }, [board]);

  const updateCell = useCallback((x, y, value) => {
    setBoard((prev) => {
      const next = prev.map((row) => [...row]);
      next[y][x] = value;
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setBoard(emptyBoard());
    setGivenCells([]);
    setMessage({ text: "Let's solve sudoku!", type: light });
  }, []);

  const generate = useCallback(async (level) => {
    setLoading(true);
    setMessage({ text: `Generating a ${level} puzzle...`, type: info });
    try {
      const { puzzle } = await generateSudoku(level);
      const newBoard = puzzleStringToBoard(puzzle);
      setBoard(newBoard);
      setGivenCells(calculateGivenCells(newBoard));
      setMessage({ text: "New puzzle ready!", type: success });
    } catch (err) {
      setMessage({ text: err.message, type: danger });
    } finally {
      setLoading(false);
    }
  }, []);

  const solve = useCallback(async () => {
    setGivenCells(calculateGivenCells(board));
    setLoading(true);
    setMessage({ text: "...solving...", type: info });
    try {
      const solution = await solveSudoku(boardToPuzzleString(board));
      setBoard(puzzleStringToBoard(solution));
      setMessage({ text: "Puzzle solved!", type: success });
    } catch (err) {
      setMessage({ text: err.message, type: danger });
    } finally {
      setLoading(false);
    }
  }, [board]);

  return {
    board,
    givenCells,
    message,
    loading,
    updateCell,
    solve,
    generate,
    reset,
  };
}
