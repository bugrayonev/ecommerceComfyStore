import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth0();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};
export default PrivateRoute;

// REACT ROUTER DOM 5 ICIN
// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// // will remove later
// // import { useUserContext } from "../context/user_context";

// const PrivateRoute = ({ children, ...rest }) => {
//   // console.log(children);
//   // console.log(rest);
//   // const { myUser } = useUserContext();
//   const { user } = useAuth0();

//   return (
//     <Route
//       {...rest}
//       render={() => {
//         return user ? children : <Redirect to="/" />;
//       }}
//     ></Route>
//   );
// };
// export default PrivateRoute;
