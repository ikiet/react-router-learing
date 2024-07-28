import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Something went wrong";

  if (error.status === 500) {
    title = "Internal Server Error";
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not Found";
    message = "The requested resource";
  }

  return (
    <>
      <div>{title}</div>
      <div>{message}</div>
    </>
  );
}

export default ErrorPage;
