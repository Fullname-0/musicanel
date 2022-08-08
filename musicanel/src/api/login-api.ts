import axios from "axios";

export const loginRequest = async (data: {email: string, password: string}, onError?: (error: { msg: string, severity: string }) => void) => {
    const url = process.env.REACT_APP_LOGIN_USER ? process.env.REACT_APP_LOGIN_USER + process.env.REACT_APP_FIREBASE_API : '';

    try {
        const response = await axios({
            method: 'post',
            url: url,
            data: JSON.stringify({
                email: data.email,
                password: data.password
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        if(response.status === 200) {
            onError && onError({msg: 'Zalogowano się pomyślnie!', severity: 'success'})
        }
        return response.data;
    } catch(error: any) {
        if(error.response.status === 400 && error.response.data.error.message === 'EMAIL_NOT_FOUND') {
            onError && onError({msg: "Brak użytkownika! Zarejestruj się już teraz!", severity: 'error'})
        } else if (error.response.status === 400 && error.response.data.error.message === 'INVALID_PASSWORD') {
            onError && onError({msg: "Błędne hasło!", severity: 'error'})
        } else {
            onError && onError({msg: "Nastąpił błąd przy wysyłaniu formularza! Spróbuj ponownie później.", severity: 'error'});
        }
    }
}
