import { EDIT_LOGIN, EDIT_PASSWORD } from '../../consts'

const initialState = {
    login: '',
    pass: ''
}

export default function loginAndPasswordReducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_LOGIN: return { ...state, login: action.text }
        case EDIT_PASSWORD: return { ...state, pass: action.text }
        default: return state
    }
}