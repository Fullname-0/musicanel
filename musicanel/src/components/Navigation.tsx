import {Grid, Box, styled} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from '../static/images/logo.svg';
import {useContext} from 'react';
import AuthContext from "../store/auth-context";

const LinkButton = styled(Box)(({ theme }) => ({
    '&:hover a': {
        color: theme.palette.secondary.light,
        fontWeight: 600,
    },
    '& a': {
        color: theme.palette.primary.contrastText,
        textDecoration: 'none',
        fontWeight: 600,
    },
    '&:last-child': {
        borderRadius: '40px',
        padding: '10px 20px',
        backgroundColor: theme.palette.secondary.light,
        '& a': {
            color: theme.palette.primary.contrastText,
        },
        '&:hover a': {
            color: theme.palette.secondary.contrastText
        },
    }
}));

const LoginLink = <Link to="/login">Zaloguj się</Link>

const Navigation = () => {
    const {isLoggedIn} = useContext(AuthContext);
    const {logout} = useContext(AuthContext);

    const logoutHandler = () => {
        logout()
    }

    const LogoutLink = <Link to="/" onClick={logoutHandler}>Wyloguj się</Link>
    const changeLink = isLoggedIn ? LogoutLink : LoginLink

    return (
        <Box component="header" sx={{backgroundColor: 'primary.main'}} pt={2} pb={2}>
            <nav>
                <Grid container justifyContent={'space-between'} alignItems={'center'} sx={{maxWidth: '1300px', margin: '0 auto'}}>
                    <Grid item>
                        <Link to="/">
                            <Box component="img" src={Logo} sx={{width: '80px'}} />
                        </Link>
                    </Grid>
                    <Grid item sx={{display: 'flex', alignItems: 'center', gap: '80px'}}>
                        <LinkButton sx={{typography: 'body1'}}>
                            <Link to="/library">Biblioteka</Link>
                        </LinkButton>
                        {!isLoggedIn &&
                            <LinkButton sx={{typography: 'body1'}}>
                                <Link to="/signup">Zarejestruj się</Link>
                            </LinkButton>
                        }
                        <LinkButton sx={{typography: 'body1'}}>
                            {changeLink}
                        </LinkButton>
                    </Grid>
                </Grid>
            </nav>
        </Box>
    )
}

export default Navigation
