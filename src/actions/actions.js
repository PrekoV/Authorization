import { AUTHORIZATION } from '../consts'

export const authorization = (isAuthorizated, user) => {
    return {
        type: AUTHORIZATION,
        isAuthorizated,
        user
    }
}

