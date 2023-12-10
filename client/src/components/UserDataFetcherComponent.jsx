import useAxiosWithInterceptor from "../config/axiosInterceptor";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function UserDataFetcherComponent() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const axiosWithInterceptor = useAxiosWithInterceptor();

  const handleRefreshClick = () => {
    // Update window.location to match the new URL
    navigate(-1);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosWithInterceptor.post("/users/userprofile");

        // Assuming the API response structure has a "data" field
        const userProfileData = response.data;
        if (userProfileData) setMessage(userProfileData.message);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, [axiosWithInterceptor]);

  // Lets Make it relevant request in order to fetch some data

  return (
    <div>
      <h2>User Info</h2>
      <p>{message}</p>
      <div>
        <button onClick={handleRefreshClick}>Go back</button>
      </div>
    </div>
  );
}

export default UserDataFetcherComponent;
