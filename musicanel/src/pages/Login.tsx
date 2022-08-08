import LoginForm from '../components/form/LoginForm';
import {Grid} from '@mui/material';

const Login = () => {
    return (
        <Grid container component={"section"} justifyContent={"center"} alignItems={"center"} sx={{maxWidth: '1300px', margin: '0 auto'}}>
            <LoginForm />
        </Grid>
    )
}

export default Login;
