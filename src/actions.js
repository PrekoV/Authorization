import { EDIT_TITLE, EDIT_BTN, EDIT_DISPLAY_INPUT, EDIT_LOGIN, EDIT_PASSWORD, ADD_USER } from './consts'

const editTitle = (text) => {
    return {
        type: EDIT_TITLE,
        text
    }
}

const editBtn = (text) => {
    return {
        type: EDIT_BTN,
        text
    }
}

const editDisplayInput = (text) => {
    return {
        type: EDIT_DISPLAY_INPUT,
        text
    }
}

const editLogin = (text) => {
    return {
        type: EDIT_LOGIN,
        text
    }
}

const editPassword = (text) => {
    return {
        type: EDIT_PASSWORD,
        text
    }
}

const addUser = (data) => {
    return {
        type: ADD_USER,
        data: data
    }
}

const actions = {
    editTitle,
    editBtn,
    editDisplayInput,
    editLogin,
    editPassword,
    addUser
}

export default actions