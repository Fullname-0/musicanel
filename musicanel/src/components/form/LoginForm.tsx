import {Button, Grid, styled, TextField, Typography, FormControl, FormHelperText, InputAdornment, InputLabel, IconButton, Input} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import SnackbarContext from "../../store/snackbar-context";
import validator from 'validator';
import {useNavigate, Link} from "react-router-dom";

const ButtonStyled = styled(Button)(({ theme }) => ({
    textAlign: 'center',
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.dark,
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    padding: '10px 30px',
    borderRadius: '40px',
    boxShadow: 'none',
    transition: 'transform .1s',
    backfaceVisibility: 'hidden',

    '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        boxShadow: 'none',
        transform: 'scale(105%)',
        border: 'none'
    },

    '& a': {
        color: theme.palette.primary.dark,
        textDecoration: 'none'
    }
}))

const LoginForm = () => {
    const {isLoggedIn, loginAction} = useContext(AuthContext)
    const {setMsg} = useContext(SnackbarContext)
    let navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const [validate, setValidate] = useState({
        emailError: '',
        passwordError: '',
    })

    const emailHanlder = (event: {target: {value: string} } ) => {
        const value = event.target.value.trim()

        if (value.length < 3) {
            setValidate((prevState) => {
                return {
                    ...prevState,
                    emailError: 'Wprowadź poprawny email'
                }
            })
        } else {
            setValidate((prevState) => {
                return {
                    ...prevState,
                    emailError: ''
                }
            })
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                email: value
            }
        })
    }

    const passwordHanlder = (event: {target: {value: string} } ) => {
        const value = event.target.value.trim()

        if(value.length < 3) {
            setValidate((prevState) => {
                return {
                    ...prevState,
                    passwordError: 'Hasło jest za krótkie'
                }
            })
        } else {
            setValidate((prevState) => {
                return {
                    ...prevState,
                    passwordError: ''
                }
            })
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                password: value
            }
        })
    }

    const handleClickShowPassword = () => {
        setFormValue((prevState) => {
            return {
                ...prevState,
                showPassword: !prevState.showPassword,
            }
        });
    };

    const validateForm = () => {
        let isValid = true;
        for(const field in validate) {
            // @ts-ignore
            const error = validate[field]
            if(error !== "") {
                isValid = false
            }
        }
        return isValid
    }

    const formHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if(!validateForm() || formValue.email.length < 1 || formValue.password.length < 1) {
            setMsg({msg: "Wprowadź dane do formularza!", severity: 'error'})
            return
        }
        if(!validator.isEmail(formValue.email)) {
            setMsg({msg: "Wprowadź poprawny email!", severity: 'error'})
            return
        }
        else {
            loginAction(formValue)
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/', { replace: true })
        }
    }, [isLoggedIn])

    return (
        <Grid container justifyContent={"center"} alignItems={"center"} flexDirection={'column'}>
            <Grid component={"form"} onSubmit={formHandler} sx={{width: '400px'}} pt={4}>
                <Grid item pt={4}>
                    <TextField
                        fullWidth
                        required
                        error={!!validate.emailError}
                        value={formValue.email}
                        onChange={emailHanlder}
                        label="Email"
                        type="email"
                        variant="standard"
                        helperText={validate.emailError}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item pt={4}>
                    <FormControl required fullWidth  variant="standard">
                        <InputLabel error={!!validate.passwordError} htmlFor="password">Hasło</InputLabel>
                        <Input
                            id="password"
                            error={!!validate.passwordError}
                            value={formValue.password}
                            onChange={passwordHanlder}
                            type={formValue.showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        sx={{padding: '0'}}
                                    >
                                        {formValue.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {validate.passwordError ? <FormHelperText id="password" error={!!validate.passwordError}>{validate.passwordError}</FormHelperText> : ''}
                    </FormControl>
                </Grid>
                <Grid item pt={4} pb={4} sx={{textAlign: 'center'}}>
                    <ButtonStyled onClick={formHandler}>Zaloguj się</ButtonStyled>
                </Grid>
            </Grid>
            <Grid item pt={4} sx={{textAlign: 'center', borderTop: '1px solid black', width: '400px'}}>
                <Typography pb={4}>Nie masz jeszcze konta? Zarejestruj się!</Typography>
                <ButtonStyled sx={{backgroundColor: 'transparent', border: '1px solid black'}}><Link to="/signup">Załóż konto</Link></ButtonStyled>
            </Grid>
        </Grid>
    )
}

export default LoginForm;
