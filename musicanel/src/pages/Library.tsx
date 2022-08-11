import MainLayout from '../components/library/MainLayout';
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getSongs} from "../store/songs-slice";
import {getPictures} from "../store/images-slice";

const Library = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        //@ts-ignore
        dispatch(getSongs())
        //@ts-ignore
        dispatch(getPictures())
    }, [])

    return (
        <MainLayout />
    )
}

export default Library;
