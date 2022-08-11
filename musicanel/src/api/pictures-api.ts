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
const listImagesRef = ref(storage, 'images');

export const picturesRequest = () => {

    const imagesUrl: Promise<string>[] = []
    const listAllPictures = listAll(listImagesRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                imagesUrl.push(getDownloadURL(ref(storage, `images/${itemRef.name}`)))
            });
            return Promise.all(imagesUrl)
        }).then((urlsArray) => {
            return urlsArray
        }).catch((error) => {
            console.log(error)
        });
    return listAllPictures
}
