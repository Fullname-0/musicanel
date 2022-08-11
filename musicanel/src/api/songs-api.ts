import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

const app = initializeApp({
    apiKey: 'AIzaSyDZ9PMIoGBqNnWhOdq26aQdVf3z-C8wZk0',
    authDomain: 'Musicanel',
    projectId: 'musicanel',
    storageBucket: 'gs://musicanel.appspot.com',
    messagingSenderId: '129228860206',
    appId: 'musicanel',
});

const storage = getStorage(app);
const listSongsRef = ref(storage, 'songs');

export const songsRequest = () => {
    const songsUrl: Promise<string>[] = []
    const names: string[] = []
    const songs: any[] = []
    const listAllSongs = listAll(listSongsRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                names.push(itemRef.name)
                songsUrl.push(getDownloadURL(ref(storage, `songs/${itemRef.name}`)))
            });
            return Promise.all(songsUrl)
        }).then(urlsArray => {
            urlsArray.map((item, index) => {
                songs.push({name: names[index], url: item})
            })
            return songs
        }).catch((error) => {
            console.log(error)
        });
    return listAllSongs
}
