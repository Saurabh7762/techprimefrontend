import { Route, Redirect } from "react-router-dom";
import isLoggedIn from "./isLoggedIn";

const PrivateRoute = ({ component, ...rest }) => {
  const isUserLoggedIn = await isLoggedIn();

  // If the user is not logged in, redirect them to the login page.
  if (!isUserLoggedIn) {
    return <Redirect to="/login" />;
  }

  // Otherwise, render the component that was passed to the `PrivateRoute` component.
  return <component {...rest} />;
};

export default PrivateRoute;