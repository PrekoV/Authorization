import { POST } from '../consts'
import { authorization, errorData } from './actions'
import API from '../connect/api'

export const authorizationThunk = (login, pass) => {
    console.log('authorization')
    return function (dispatch) {
        return API(POST, 'token/', { email: login, password: pass })
            .then(res => {
                localStorage.setItem("hash", res.token.hash)
                localStorage.setItem("user_data", JSON.stringify(res.user))
                dispatch(authorization(res.user))
                dispatch(errorData(''))
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

export const authorizatedThunk = () => {
    console.log('authorizated user')
    const userData = localStorage.getItem("user_data")
    return function (dispatch) {
        dispatch(authorization(JSON.parse(userData)))
        dispatch(errorData(''))
    }
}

export const logOutThunk = () => {
    localStorage.clear()
    return function (dispatch) {
        dispatch(authorization({}))
        dispatch(errorData(''))
    }
}

export const setErrorData = (error) => {
    return function (dispatch) {
        return dispatch(errorData(error))
    }
}