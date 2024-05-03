import {createContext, useContext, useState} from 'react'

export const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null)

    const [isLogged, setIsLogged] = useState(false)

    const value = {
        user,
        setUser,
        isLogged,
        setIsLogged
    }

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}