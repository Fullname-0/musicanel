import {Grid, Card, Box, CardContent, Typography, CardMedia, IconButton} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import {useEffect, useRef, useState} from "react";

const CardSong = (props: any) => {
    const [title, setTitle] = useState('')
    const [play, setPlay] = useState(false)
    const audioPlay = useRef(new Audio())

    useEffect(() => {
        regexOfNameSong(props.songs.name)
    }, [props.songs])

    const regexOfNameSong = (text: string) => {
        let title = text.replace(/.mp3|_/g, ' ')
        setTitle(title)
    }

    const togglePlay = () => {
        audioPlay.current.play()
        setPlay(!play)
    }

    const togglePause = () => {
        audioPlay.current.pause()
        setPlay(!play)
    }

    return (
        <Grid container mt={6}>
            <Card sx={{ display: 'flex', justifyContent: 'space-between', margin: '0 auto', width: '500px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
                    <CardContent>
                        <Typography component="div" variant="h5">
                            {title}
                        </Typography>
                    </CardContent>
                    <Box>
                        {play ?
                            <IconButton aria-label="play/pause" onClick={togglePause}>
                                <PauseIcon sx={{height: 38, width: 38}} />
                            </IconButton> :
                            <IconButton aria-label="play/pause" onClick={togglePlay}>
                                <PlayArrowIcon
                                    sx={{height: 38, width: 38}} />
                            </IconButton>
                        }
                        <figure>
                            <audio ref={audioPlay}>
                                <source src={`${props.songs.url}.mp3`} type="audio/mpeg" />
                            </audio>
                        </figure>
                    </Box>
                </Box>
                <CardMedia
                    component={"img"}
                    sx={{ width: 150, height: 150, }}
                    image={props.images}
                    alt="Live from space album cover"
                />
            </Card>
        </Grid>
    )
}

export default CardSong;
