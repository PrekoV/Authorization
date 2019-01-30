import { AUTHORIZATION, ERROR_DATA, IS_AUTHORIZATED } from '../../consts'

const initialState = {
    user: localStorage.getItem("user_data") ? { ...JSON.parse(localStorage.getItem("user_data")) } : {},
    isAuth: localStorage.getItem("user_data") ? true : false,
    err: ''
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTHORIZATION:
            return {
                ...state,
                user: action.user
            }
        case ERROR_DATA:
            return {
                ...state,
                err: action.err
            }
        case IS_AUTHORIZATED:
            return {
                ...state,
                isAuth: action.isAuth
            }
        default: return state
    }
}
