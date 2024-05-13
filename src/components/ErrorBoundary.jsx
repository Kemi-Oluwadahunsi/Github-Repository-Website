import { useState, useEffect } from "react";

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event) => {
      console.error("Error occurred:", event.error);
      setHasError(true);
    };

    const handleUnhandledPromiseRejection = (event) => {
      console.error("Unhandled promise rejection:", event.reason);
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    window.addEventListener(
      "unhandledrejection",
      handleUnhandledPromiseRejection
    );

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledPromiseRejection
      );
    };
  }, []);

  useEffect(() => {
    if (hasError) {
      console.log("An error occurred. Fallback UI will be displayed.");
    }
  }, [hasError]); // Ensure useEffect runs when hasError changes

  if (hasError) {
    console.log("Rendering fallback UI.");
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <h1 className="text-center text-[3rem] font-bold">
          <span className="text-[#0c4d80]">Oops! </span>Something went wrong. View
          console for details.
        </h1>
      </div>
    );
  }

  return <>{children}</>;
}

export default ErrorBoundary;
