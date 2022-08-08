import {Grid, Box, styled, Typography, Button} from "@mui/material";
import FrontImage from '../static/images/main.jpg';
import {Link} from 'react-router-dom';

const SpanHeading = styled(Box)(({ theme }) => ({
    marginLeft: '108px',
    color: theme.palette.secondary.light
}))

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
    marginTop: '32px',
    backfaceVisibility: 'hidden',

    '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        boxShadow: 'none',
        transform: 'scale(105%)',
    },

    '& a': {
        textDecoration: 'none',
        color: 'inherit'
    }
}))

const FrontPage = () => {
    return (
        <Grid container component={"section"} justifyContent={"space-between"} alignItems={"flex-end"}>
            <Grid item>
                <Box component="img" alt="Musicanel" src={FrontImage} sx={{width: '350px'}} mb={-0.5} />
            </Grid>
            <Grid item sx={{alignSelf: 'center'}}>
                <Typography variant="h1" color="primary.dark" sx={{fontWeight: '900'}}>Listening is <br /><SpanHeading component="span">everything</SpanHeading></Typography>
                <Typography variant="body1" align="center" sx={{fontWeight: '600'}} mt={4}>Miliony utworów i podcastów. Wypróbuj za darmo i zapomnij o reklamach.</Typography>
                <Grid item sx={{textAlign: 'center'}}>
                    <ButtonStyled variant="contained">
                        <Link to="/signup">Załóż konto free</Link>
                    </ButtonStyled>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FrontPage
