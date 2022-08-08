import FrontPage from "../components/FrontPage";
import {Grid} from "@mui/material";

const height = window.innerHeight - 117

const Home = () => {
    return (
        <Grid container flexDirection={'column'} justifyContent={'flex-end'} sx={{height: {height}, maxWidth: '1300px', margin: '0 auto'}}>
            <FrontPage />
        </Grid>
    )
}

export default Home;
