import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../ReduxSlices/User";
export const Register = () => {
  const isSigned = useSelector(isLoggedIn);
  return isSigned ? <Navigate to="/" /> : <Outlet />;
};
