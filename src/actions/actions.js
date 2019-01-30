import { AUTHORIZATION, ERROR_DATA, IS_AUTHORIZATED } from '../consts'

export const authorization = (user) => {
    return {
        type: AUTHORIZATION,
        user
    }
}

export const isAuthorizated = (isAuth) => {
    return {
        type: IS_AUTHORIZATED,
        isAuth
    }
}

export const errorData = (err) => {
    return {
        type: ERROR_DATA,
        err
    }
}
