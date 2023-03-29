
import { createContext, useEffect, useState } from "react"
import { makeRequest } from "../axios"
export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState((JSON.parse(localStorage.getItem("user"))) || null)

    const login = async (inputs) => {

        const url = "/auth/login"

        try {
            const response = await makeRequest.post(url, inputs, {
                withCredentials: true
            })
            setCurrentUser(response.data.user)
            if (response.data.success) return "OK"

        }
        catch (error) {
            console.log(error)
            return error.response.data.message
        }
    };
    const logout = () => {
        setCurrentUser(null)
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider >
    )
}

