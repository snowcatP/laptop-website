import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'
import { useEffect } from "react";
import { customerProfile } from "../service/ClientService";

const LoginUtil = () => {
  const {setUser, isLogged, setIsLogged} = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
      const token = localStorage.getItem("token");
  
      if (token) {
          const decode_token = jwtDecode(token);
  
          const current = new Date();
      
          if (decode_token.exp * 1000 < current.getTime) {
            setIsLogged(false);
            navigate("/auth/login");
            return;
          }

          const user = async () => {
            const headers = { Authorization: `Bearer ${token}` };

            const response = await customerProfile(headers);
            
            setUser(response.data);
          };
          
          user();
          setIsLogged(true)

      } else {
          navigate("/auth/login");
          return;
      }

  }, [navigate, isLogged, setIsLogged, setUser])
  
};

export default LoginUtil;
