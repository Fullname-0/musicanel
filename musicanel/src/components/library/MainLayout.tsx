import {Grid, Box} from "@mui/material";
import {useSelector} from "react-redux";
import CardSong from './CardSong';
import {useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const MainLayout = () => {
    const songs = useSelector((state: {songs: {songs: []}}) => state.songs.songs)
    const images = useSelector((state: {images: {images: []}}) => state.images.images)
    const [isloading, setIsLoading] = useState(true)

    useEffect(() => {
        if(songs.length > 0) {
            setIsLoading(false)
        }
    }, [songs, images])

    return (
        <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={"center"} sx={{maxWidth: '1300px', margin: '0 auto'}}>
            {!isloading ?
                songs.map((item: any, index: number) => {
                    return <CardSong key={index} images={images[index]} songs={songs[index]} />
                }) : <Box pt={10}><CircularProgress /></Box>
            }
        </Grid>
    )
}

export default MainLayout;
