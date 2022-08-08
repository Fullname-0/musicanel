import {Box, Snackbar, Alert} from '@mui/material';
import React, {useContext} from 'react';
import SnackbarContext from "../store/snackbar-context";
import Navigation from "../components/Navigation";

const Layout = (props: any) => {
    const {message, severity, setMsg} = useContext(SnackbarContext)

    return (
        <>
            <Navigation />
            <Box component={"main"}>
                {props.children}
            </Box>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={message !== "" && message !== undefined} onClose={() => setMsg({msg: "", severity: 'error'})}>
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
        </>
    )
}

export default Layout
