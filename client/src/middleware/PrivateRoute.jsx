import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCredential } from "../redux/slices/AuthSlice";

function PrivateRoute() {
  const { token } = useSelector(getCredential);
  console.log(token);

  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;
