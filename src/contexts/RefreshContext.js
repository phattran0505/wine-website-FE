import { createContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { BASE_URL } from "../config/utils";

export const RefreshContext = createContext();
function RefreshProvider({ children }) {
  const refreshToken = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/refreshToken`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await res.json();
      localStorage.setItem("accessToken", result.accessToken);
      console.log(result);
      return result.accessToken;
    } catch (error) {
      return alert(error);
    }
  };
  
  const handleRefreshToken = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return null;
    }
    try {
      const decodedToken = jwtDecode(accessToken);
      if (decodedToken.exp < Date.now() / 1000) {
        console.log("token expired");
        const newAccessToken = await refreshToken();
        return newAccessToken;
      } else {
        return accessToken;
      }
    } catch (error) {
      return alert(error);
    }
  };
  return (
    <RefreshContext.Provider value={{ handleRefreshToken }}>
      {children}
    </RefreshContext.Provider>
  );
}

export default RefreshProvider;
