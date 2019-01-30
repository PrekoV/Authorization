import { POST } from '../consts'
import { authorization, errorData, isAuthorizated } from './actions'
import API from '../connect/api'
import { history } from '../store';

export const authorizationThunk = (login, pass) => {
    console.log('authorization')
    return function (dispatch) {
        return API(POST, 'token/', { email: login, password: pass })
            .then(res => {
                localStorage.setItem("hash", res.token.hash)
                localStorage.setItem("user_data", JSON.stringify(res.user))
                dispatch(isAuthorizated(true))
                dispatch(authorization(res.user))
                history.push('/home')
            }, err => {
                console.log(err.message)
                dispatch(errorData('☹ There is some problems with server...'))
            }).catch(e => {
                console.log(e.message)
                dispatch(errorData('✖ Invalid login or password'))
                document.getElementById('pass').value = ''
            })
    }
}

// export const authorizatedThunk = () => {
//     console.log('authorizated user')
//     const userData = localStorage.getItem("user_data")
//     return function (dispatch) {
//         dispatch(authorization(JSON.parse(userData)))
//         dispatch(errorData(''))
//         dispatch(isAuthorizated(true))
//     }
// }

export const logOutThunk = () => {
    localStorage.clear()
    return function (dispatch) {
        dispatch(authorization({}))
        dispatch(errorData(''))
        dispatch(isAuthorizated(false))
        history.push('/auth')
    }
}

export const setErrorData = (error) => {
    return function (dispatch) {
        return dispatch(errorData(error))
    }
}

export const isAuthorizatedThunk = (value) => {
    return function (dispatch) {
        return dispatch(isAuthorizated(value))
    }
}