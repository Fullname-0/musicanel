import React, {useState, useContext} from 'react';
import {registUser} from '../api/register-api';
import SnackbarContext from "./snackbar-context";

const RegistContext = React.createContext({
    isRegist: false,
    removeIsRegist: (data: boolean) => {},
    registerUser: (data: {name: string, lastname: string, email: string, password: string}) => {}
})

export const RegistContextProvider = (props: any) => {
    const [registeredUser, setRegisteredUser] = useState(false)
    const {setMsg} = useContext(SnackbarContext)

    const registerUser = (data: {name: string, lastname: string, email: string, password: string}) => {
        registUser(data, (error) => setMsg(error)).then((response) => {
            setRegisteredUser(true)
        })
    }

    const removeIsRegist = (data: boolean) => {
        setRegisteredUser(data)
    }

    const isRegist = registeredUser

    const contextValue = {
        isRegist,
        removeIsRegist,
        registerUser
    }

    return (
        <RegistContext.Provider value={contextValue}>{props.children}</RegistContext.Provider>
    )
}

export default RegistContext;
