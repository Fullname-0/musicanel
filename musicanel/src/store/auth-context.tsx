import React, {useState, useContext} from 'react';
import {loginRequest} from '../api/login-api';
import SnackbarContext from "./snackbar-context";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token: any) => {},
    logout: () => {},
    loginAction: (data: {email: string, password: string}) => {}
})

export const AuthContextProvider = (props: any) => {
    const {setMsg} = useContext(SnackbarContext)

    const [token, setToken] = useState('')

    const isLoggedInUser = !!token

    const loginHandler = (token: any) => {
        setToken(token)
    }

    const logoutHandler = () => {
        setToken('')
        setMsg({msg: 'Wylogowano pomyślnie', severity: 'success'})
    }

    const loginAction = (data: {email: string, password: string}) => {
        loginRequest(data, (error) => setMsg({msg: error.msg, severity: error.severity})).then((response) => {
            loginHandler(response.idToken)
        })
    }

    const contextValue = {
        token,
        isLoggedIn: isLoggedInUser,
        login: loginHandler,
        logout: logoutHandler,
        loginAction
    }

    return (
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;
