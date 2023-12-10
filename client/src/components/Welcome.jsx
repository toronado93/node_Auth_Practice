import UserComponent from "./UserComponent";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout, refreshtoken } from "../redux/slices/AuthSlice";

function Welcome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // In welcome page there will be one more button open the usercomponent itself , in order to test userfetching process when token is expired.

  const LogOutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  const userComponentHandler = () => {
    navigate("/userinfo");
  };

  const refreshHandler = () => {
    dispatch(refreshtoken());
  };

  return (
    <>
      <UserComponent></UserComponent>
      <div>
        <button onClick={LogOutHandler}>Log Out</button>
        <button onClick={userComponentHandler}>Ask User Info</button>
        <button onClick={refreshHandler}>Refresh Token</button>
      </div>
    </>
  );
}

export default Welcome;
