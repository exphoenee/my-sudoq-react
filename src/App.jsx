/* Libraries */
import { Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

/* Other imports */
import "./App.css";

/* Components */
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LandingPage from "./Components/LandingPage/LandingPage";
import EMailList from "./Components/EMailList/EMailList";
import SudokuSolver from "./Components/SudokuSolver/SudokuSolver";

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

export default function App() {
  return (
    <>
      <Header menuPoints={menuPoints} />
      <main>
        <Routes>
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
      </main>
      <footer></footer>
      <Footer />
    </>
  );
}

/* Styled Components */
