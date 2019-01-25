import { AUTHORIZATION, EDIT_LOGIN, EDIT_PASSWORD } from '../consts'

export const editLogin = (text) => {
    return {
        type: EDIT_LOGIN,
        text
    }
}

export const editPassword = (text) => {
    return {
        type: EDIT_PASSWORD,
        text
    }
}

export const authorization = (title, displayInput, btn, user) => {
    return {
        type: AUTHORIZATION,
        title,
        displayInput,
        btn,
        user
    }
}

