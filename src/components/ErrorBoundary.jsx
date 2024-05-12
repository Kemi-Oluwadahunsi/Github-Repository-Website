import { useState, useEffect } from "react";

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    //  custom fallback UI
    return <div className="h-[70vh] flex justify-center items-center"><h1 className="text-center text-[3rem] font-bold">Something went wrong. View console for details.</h1></div>;
  }

  return <>{children}</>;
}

export default ErrorBoundary;
