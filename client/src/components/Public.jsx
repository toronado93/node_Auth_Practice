import { Link } from "react-router-dom";

function Public() {
  return (
    <div>
      <h2> Public</h2>
      <Link to="login">Go to the Login</Link>
    </div>
  );
}

export default Public;
