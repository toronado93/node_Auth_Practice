import { useSelector } from "react-redux";
import { getCredential } from "../redux/slices/AuthSlice";
function UserComponent() {
  // user component has users accesstoken and refreshtoken

  const { token } = useSelector(getCredential);

  return (
    <div>
      <div className="">
        <label>AccessToken:</label>
        <p className="custom_max_width">{token}</p>
      </div>
      <div>
        <label>RefreshToken:</label>
        <p></p>
      </div>
    </div>
  );
}

export default UserComponent;
