import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import {jwtDecode} from 'jwt-decode'
import { checkValidToken } from "../service/AdminService";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = (props) => {
    const [admin, setAdmin] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const decoded_token = jwtDecode(token);

        const current = new Date();

        if(decoded_token.exp * 1000 > current.getTime()){
            const checkIsValid = async () => {
                const response = await checkValidToken({
                    "token": token
                });

                if(response.data["valid"] === true) {
                    const getAdminProfile = async () => {
                        const headers = { Authorization: `Bearer ${token}` };

                        const response = await adminProfile(headers);

                        setAdmin(response.data)
                        setIsLogged(true)
                    }
                    getAdminProfile()
                }
            }
            checkIsValid()
        }
    }, [admin, isLogged])

    const values = {
        admin,
        setAdmin,
        isLogged,
        setIsLogged
    }

    return (
        <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
    );
};