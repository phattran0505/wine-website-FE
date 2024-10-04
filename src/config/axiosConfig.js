import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { loginSuccess, logoutSuccess } from "../redux/authSlice";
import { useCallback } from "react";
import { BASE_URL } from "./utils";

const useAxiosJWT = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const axiosJWT = useCallback(() => {
    const instance = axios.create();

    const handleRefreshToken = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/auth/refreshToken`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        return res.data;
      } catch (error) {
        throw error;
      }
    };

    instance.interceptors.request.use(
      async (config) => {
        let date = new Date();
        const decodedToken = jwtDecode(user.accessToken);
        const refreshThreshold = 60;
        if (decodedToken.exp < date.getTime() / 1000 - refreshThreshold) {
          const data = await handleRefreshToken();
          if (data && data.accessToken) {
            const refreshUser = { ...user, accessToken: data.accessToken };
            dispatch(loginSuccess(refreshUser));
            config.headers["Authorization"] = `Bearer ${data.accessToken}`;
          } else {
            dispatch(logoutSuccess());
          }
        } else {
          config.headers["Authorization"] = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    return instance;
  }, [dispatch, user]);

  return axiosJWT;
};

export default useAxiosJWT;
