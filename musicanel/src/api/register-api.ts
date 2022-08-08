import axios from "axios";

export const registUser = async (data: {name: string, lastname: string, email: string, password: string}, onError?: (error: {msg: string, severity: string}) => void) => {
    const url = process.env.REACT_APP_REGISTER_NEW_USER ? process.env.REACT_APP_REGISTER_NEW_USER + process.env.REACT_APP_FIREBASE_API : process.env.REACT_APP_REGISTER_NEW_USER

    try {
        const response = await axios({
            method: 'post',
            url: url,
            data: JSON.stringify({
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: data.password
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        if(response.status === 200) {
            onError && onError({msg: 'Dziękujemy za rejestrację.', severity: 'success'})
        }
        return response.data
    }
    catch(error: any) {
        if(error.response.status === 400 && error.response.data.error.message === 'EMAIL_EXISTS') {
            onError && onError({msg: 'Użytkownik o takim mailu już istnieje.', severity: 'error'})
        }
        else {
            onError && onError({msg: 'Nastąpił błąd przy wysyłaniu formularza! Spróbuj ponownie później.', severity: 'error'})
        }
    }
}
