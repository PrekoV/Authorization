import { POST, GET } from '../../consts'
import { authorizationSuccess, authorizationBad, errorData } from './actions'
import API from '../../services/api'
import { history } from '../../store';

export const authorizationThunk = (login, pass) => {
    console.log('authorization')
    return function (dispatch) {
        return API(POST, 'token/', { email: login, password: pass })
            .then(res => {
                switch (res.status) {
                    case 401: dispatch(errorData('✖ Invalid login or password'))
                        break
                    case 201: res.json().then(json => {
                        localStorage.setItem("hash", json.token.hash)
                        localStorage.setItem("user_id", json.user.id)
                        dispatch(authorizationSuccess(json.user, true))
                        history.push('/home')
                    })
                        break
                    default: dispatch(errorData('☹ There are some problems with server...'))
                }
            })
    }
}

export const authorizatedThunk = () => {
    console.log('authorizated user')
    const userId = localStorage.getItem("user_id")
    return function (dispatch) {
        return API(GET, 'user/' + userId)
            .then(res => { return res.json() })
            .then(json => { dispatch(authorizationSuccess(json.user, true)) },
                err => {
                    console.log(err.message)
                    dispatch(errorData('☹ There are some problems with server...'))
                })
    }
}

export const logOutThunk = () => {
    localStorage.clear()
    return function (dispatch) {
        dispatch(authorizationBad())
        dispatch(errorData(''))
        history.push('/auth')
    }
}

export const setErrorData = (error) => {
    return function (dispatch) { return dispatch(errorData(error)) }
}