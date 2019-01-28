import { AUTHORIZATION, ERROR_DATA } from '../consts'

export const authorization = (user) => {
    return {
        type: AUTHORIZATION,
        user
    }
}

export const errorData = (err) => {
    return {
        type: ERROR_DATA,
        err
    }
}
