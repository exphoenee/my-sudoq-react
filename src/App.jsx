/* Libraries */
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

/* Animation */
import { AnimatePresence } from "framer-motion";

/* Other imports */
import "./App.css";

/* Components */
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LandingPage from "./Components/LandingPage/LandingPage";
import EMailList from "./Components/EMailList/EMailList";
import SudokuSolver from "./Components/SudokuSolver/SudokuSolver";

export default function App() {
  const location = useLocation();
  /* Props */
  const menuPoints = [
    {
      text: "Home",
      route: "/",
      element: <LandingPage />,
    },
    {
      text: "Subscribe",
      route: "/emaillist",
      element: <EMailList />,
    },
    {
      text: "Sudoku Solver",
      route: "/sudokusolver",
      element: <SudokuSolver />,
    },
  ];
  return (
    <>
      <Header menuPoints={menuPoints} />
      <main>
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            {menuPoints.map((elem) => (
              <Route
                key={uuidv4()}
                path={`${elem.route}`}
                exact
                element={elem.element}
              />
            ))}
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <footer></footer>
      <Footer />
    </>
  );
}

/* Styled Components */
