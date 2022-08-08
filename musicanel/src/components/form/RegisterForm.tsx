import {Button, Grid, styled, TextField, Checkbox, FormGroup, FormLabel, FormControlLabel, FormControl, FormHelperText, InputAdornment, InputLabel, IconButton, Input} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useState, useContext, useEffect} from "react";
import validator from 'validator';
import SnackbarContext from "../../store/snackbar-context";
import RegistContext from "../../store/regist-context";
import {useNavigate} from "react-router-dom";

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
    }
}))

const LoginForm = () => {
    const {setMsg} = useContext(SnackbarContext)
    const navigate = useNavigate();
    const {registerUser, isRegist, removeIsRegist} = useContext(RegistContext)

    const [formValue, setFormValue] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        agreements: false,
        showPassword: false,
    });
    const [validate, setValidate] = useState({
        nameError: '',
        lastnameError: '',
        emailError: '',
        passwordError: '',
        agreementsError: ''
    })

    const lastnameHanlder = (event: {target: {value: string} } ) => {
        const value = event.target.value.trim()

        if(value.length < 3) {
            setValidate((prevState) => {
                return {
                    ...prevState,
                    lastnameError: 'Wprowadź poprawny email'
                }
            })
        } else {
            setValidate((prevState) => {
                return {
                    ...prevState,
                    lastnameError: ''
                }
            })
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                lastname: value
            }
        })
    }

    const nameHanlder = (event: {target: {value: string} } ) => {
        const value = event.target.value.trim()

        if(value.length < 3) {
            setValidate((prevState) => {
                return {
                    ...prevState,
                    nameError: 'Wprowadź poprawny email'
                }
            })
        } else {
            setValidate((prevState) => {
                return {
                    ...prevState,
                    nameError: ''
                }
            })
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                name: value
            }
        })
    }

    const emailHanlder = (event: {target: {value: string} } ) => {
        const value = event.target.value.trim()

        if(value.length < 3) {
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

    const agreementsHandler = (event: { target: { checked: boolean } } ) => {
        if(!event.target.checked) {
            setValidate((prevState) => {
                return {
                    ...prevState,
                    agreementsError: 'Zgody marketingowe są niezbędne!'
                }
            })
        } else {
            setValidate((prevState) => {
                return {
                    ...prevState,
                    agreementsError: ''
                }
            })
        }

        setFormValue((prevState) => {
            return {
                ...prevState,
                agreements: event.target.checked
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
        for(const field in formValue) {
            // @ts-ignore
            const error = formValue[field]
            if(error === '') {
                isValid = false
            }
        }
        return isValid
    }

    const formHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if(!validateForm() || formValue.email.length < 1 || !formValue.agreements) {
            setMsg({msg: "Wprowadź dane do formularza!", severity: 'error'})
            return
        }
        if (!validator.isEmail(formValue.email)) {
            setMsg({msg: "Wprowadź poprawny email!", severity: 'error'})
            return
        } else {
            registerUser(formValue)
        }
    }

    useEffect(() => {
        if(isRegist) {
            navigate('/login', {replace: true})
            removeIsRegist(false)
        }
    }, [isRegist])

    return (
        <Grid container justifyContent={"center"} alignItems={"center"} flexDirection={'column'}>
            <Grid component={"form"} sx={{width: '400px'}} pt={4}>
                <Grid item pt={4}>
                    <TextField
                        fullWidth
                        required
                        error={!!validate.nameError}
                        value={formValue.name}
                        onChange={nameHanlder}
                        label="Imię"
                        type="text"
                        variant="standard"
                        helperText={validate.nameError}
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
                    <TextField
                        fullWidth
                        required
                        error={!!validate.lastnameError}
                        value={formValue.lastname}
                        onChange={lastnameHanlder}
                        label="Nazwisko"
                        type="text"
                        variant="standard"
                        helperText={validate.lastnameError}
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
                    <FormControl fullWidth required variant="standard">
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
                <Grid item pt={4}>
                    <FormControl error={!!validate.agreementsError} variant="standard" required>
                        <FormLabel component="legend">Zgody marketingowe</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        required
                                        checked={formValue.agreements}
                                        onChange={agreementsHandler}
                                    />
                                }
                                label="Akceptuję zgody marketingowe serwisu"
                            />
                        </FormGroup>
                        {validate.agreementsError ? <FormHelperText>{validate.agreementsError}</FormHelperText> : ''}
                    </FormControl>
                </Grid>
                <Grid item pt={4} pb={4} sx={{textAlign: 'center'}}>
                    <ButtonStyled onClick={formHandler}>Zarejestruj się</ButtonStyled>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LoginForm;
