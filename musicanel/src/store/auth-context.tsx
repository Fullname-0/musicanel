import React, {useState, useContext, useEffect, useCallback} from 'react';
import {loginRequest} from '../api/login-api';
import SnackbarContext from "./snackbar-context";

let logoutTimer: string | number | NodeJS.Timeout | undefined;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token: any, time: any) => {},
    logout: () => {},
    loginAction: (data: {email: string, password: string}) => {}
})

const calculateRemainingTime = (expirationTime: any) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration
}

const retriveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpirationTime = localStorage.getItem('time')

    const remainingTime = calculateRemainingTime(storedExpirationTime)
    if(remainingTime <= 120000) {
        localStorage.removeItem('token')
        localStorage.removeItem('time')
        return null
    }
    return {storedToken, storedExpirationTime}
}

export const AuthContextProvider = (props: any) => {
    const tokenData = retriveStoredToken()
    const {setMsg} = useContext(SnackbarContext)
    let initialToken;

    if(tokenData) {
        initialToken = tokenData.storedToken
    }

    const [token, setToken] = useState(initialToken ? initialToken : '')
    const isLoggedInUser = !!token

    const logoutHandler = useCallback(() => {
        setToken('')
        setMsg({msg: 'Wylogowano pomyślnie', severity: 'success'})
        localStorage.removeItem('token')
        localStorage.removeItem('time')
        logoutTimer && clearTimeout(logoutTimer)
    }, [])

    useEffect(() => {
        if(tokenData) {
            // @ts-ignore
            logoutTimer = setTimeout(logoutHandler, tokenData.storedExpirationTime)
        }
    }, [tokenData, logoutHandler])

    const loginHandler = (token: any, expirationTime: any) => {
        setToken(token)
        localStorage.setItem('token', token)
        localStorage.setItem('time', expirationTime)

        const remainingTime = calculateRemainingTime(expirationTime)
        logoutTimer = setTimeout(logoutHandler, remainingTime)
    }

    const loginAction = (data: {email: string, password: string}) => {
        loginRequest(data, (error) => setMsg({msg: error.msg, severity: error.severity})).then((response) => {
            // const expirationTime = new Date(new Date().getTime() + (+response.expiresIn * 1000))
            const expirationTime = 120000
            // @ts-ignore
            loginHandler(response.idToken, expirationTime)
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
