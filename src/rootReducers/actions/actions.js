import { AUTHORIZATION_SUCCESS, AUTHORIZATION_BAD, ERROR_DATA } from '../../consts'

export const authorizationSuccess = (user, isAuth) => {
    return {
        type: AUTHORIZATION_SUCCESS,
        user,
        isAuth
    }
}

export const authorizationBad = () => {
    return {
        type: AUTHORIZATION_BAD,
        user: {},
        isAuth: false
    }
}

export const errorData = (err) => {
    return {
        type: ERROR_DATA,
        err
    }
}
