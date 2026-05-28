import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import Loader from "./Loader";


const ProtectedRoute = ({
  children,
}) => {

  const {
    user,
    loading,
  } = useAuth();


  // Wait until auth check finishes
  if (loading) {
    return <Loader />;
  }


  // Double-check localStorage
  const storedUser =
    localStorage.getItem(
      "user"
    );

  const token =
    localStorage.getItem(
      "token"
    );


  if (
    !user &&
    (!storedUser || !token)
  ) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  return children;
};

export default ProtectedRoute;