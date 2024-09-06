import { useParams } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import InternalServerError from "../pages/InternalServerError";
import Forbidden from "../pages/Forbidden";

function ErrorBoundary() {
  const { statusCode } = useParams<{ statusCode: string }>();


  const parsedStatusCode = statusCode ? parseInt(statusCode, 10) : 500;

  switch (parsedStatusCode) {
    case 403:
      return <Forbidden />;
    case 404:
      return <NotFoundPage />;
    case 500:
      return <InternalServerError />;

    default:
      return <div>An unexpected error occurred.</div>;
  }
}

export default ErrorBoundary;
