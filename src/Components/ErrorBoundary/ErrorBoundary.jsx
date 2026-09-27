/* Libraries */
import React from "react";
import PropTypes from "prop-types";

/* Catches render-time errors below it so a bug in one component doesn't
   blank the whole page. Must be a class component - React has no hook
   equivalent for getDerivedStateFromError/componentDidCatch. */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Unhandled error in SudokuSolver:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-fallback text-center">
          <h1>Something went wrong.</h1>
          <p>Please reload the page and try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
