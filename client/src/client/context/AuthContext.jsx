import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { checkValidToken, customerProfile } from "../service/ClientService";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded_token = jwtDecode(token);

      const current = new Date();

      if (decoded_token.exp * 1000 > current.getTime()) {
        const checkIsValid = async () => {
          const response = await checkValidToken({
            token: token,
          });

          if (response.data["valid"] === true) {
            const userProfile = async () => {
              const headers = { Authorization: `Bearer ${token}` };

              const response = await customerProfile(headers);

              setUser(response.data);
              setIsLogged(true);
            };
            userProfile();
          }
        };
        checkIsValid();
      }
    }
  }, [user, isLogged]);

  const values = {
    user,
    setUser,
    isLogged,
    setIsLogged,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};
