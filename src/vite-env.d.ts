/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUDOKU_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
