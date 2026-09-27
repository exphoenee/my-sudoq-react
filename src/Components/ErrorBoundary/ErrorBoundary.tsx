import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/* Catches render-time errors below it so a bug in one component doesn't
   blank the whole page. Must be a class component - React has no hook
   equivalent for getDerivedStateFromError/componentDidCatch. */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
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
