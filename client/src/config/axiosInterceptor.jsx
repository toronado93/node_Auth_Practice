// In this axios , we take axios instance , refresh token method
import axios from "./axios";
import { refreshtoken } from "../redux/slices/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { getCredential } from "../redux/slices/AuthSlice";
import { useEffect } from "react";

const useAxiosWithInterceptor = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(getCredential);

  //   Fill axios instence with interceptors
  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        const accessToken = token;

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseIntercept = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      // If there is an error , means token is expired , refresh the token
      async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token
        if (error.response.status === (403 || 401) && !originalRequest.sent) {
          originalRequest.sent = true;

          try {
            // Attempt to refresh the access token and Update the stored access token
            await dispatch(refreshtoken());

            // Retry the original request with the new access token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (refreshError) {
            // Handle the refresh error, e.g., redirect to login page
            console.error("Failed to refresh access token:", refreshError);
            // You might want to redirect to the login page or handle the error differently
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [dispatch, token]);

  return axios;
};

export default useAxiosWithInterceptor;
