import React, {useReducer, useState} from 'react';

const SnackbarContext = React.createContext({
    message: '',
    severity: undefined,
    setMsg: (data: {msg: string, severity: string | 'error'}) => {}
})

const msgReducer = (state: any, action: any) => {
    switch(action.type) {
        case 'SET_MSG': {
            return {
                ...state,
                message: action.value,
                severity: action.severity
            }
        }
        default:
            return state
    }
}

export const SnackbarContextProvider = (props: any) => {
    const [stateSnackbarContext, dispatch] = useReducer(msgReducer, SnackbarContext)

    const setMsg = (data: any) => {
        dispatch({
            type: 'SET_MSG',
            value: data.msg,
            severity: data.severity
        })
    }

    const snackbarValue = {
        ...stateSnackbarContext,
        setMsg
    }

    return (
        <SnackbarContext.Provider value={snackbarValue}>{props.children}</SnackbarContext.Provider>
    )
}

export default SnackbarContext;
