import { AUTHORIZATION_SUCCESS, AUTHORIZATION_BAD, ERROR_DATA } from '../../consts'

const initialState = {
    user: {},
    isAuth: localStorage.getItem("hash") ? true : false,
    err: ''
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTHORIZATION_SUCCESS:
            return {
                ...state,
                user: action.user,
                isAuth: action.isAuth,
                err: ''
            }
        case AUTHORIZATION_BAD:
            return {
                ...state,
                user: action.user,
                isAuth: action.isAuth
            }
        case ERROR_DATA:
            return {
                ...state,
                err: action.err
            }
        default: return state
    }
}
