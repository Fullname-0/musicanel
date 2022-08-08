import RegisterForm from '../components/form/RegisterForm';
import {Grid} from '@mui/material';

const Signup = () => {
    return (
        <Grid container component={"section"} justifyContent={"center"} alignItems={"center"} sx={{maxWidth: '1300px', margin: '0 auto'}}>
            <RegisterForm />
        </Grid>
    )
}

export default Signup;
