import { emailPattern, POST, GET } from '../consts'
import { editLogin, editPassword, authorization } from './actions'
import API from '../connect/api'

export const authorizationThunk = (login, pass) => {
    console.log('authorization')
    if (!localStorage.getItem("hash") && login && pass) {
        console.log("Input values: " + login + " " + pass)
        if (emailPattern.test(login)) {
            return function (dispatch) {
                return API(POST, 'token/', { email: login, password: pass })
                    .then(res => {
                        localStorage.setItem("hash", res.token.hash)
                        localStorage.setItem("id", res.user.id)
                        Promise.all([
                            dispatch(editLogin(login)),
                            dispatch(editPassword(pass)),
                            dispatch(authorization(
                                'Welcome, ' + res.user.firstName + '!',
                                'none',
                                'Log out',
                                res.user))
                        ])
                    }, err => { console.log(err.message) })
                    .then(() => {
                        document.getElementById("login").value = ''
                        document.getElementById("pass").value = ''
                    }).catch(e => {
                        console.log(e.message)
                        dispatch(authorization('Invalid login or password', 'flex', 'Submit', {}))
                    })
            }
        }
    } else {
        localStorage.clear()
        return function (dispatch) {
            dispatch(authorization('Log in', 'flex', 'Submit', {}))
        }
    }
}

export const authorizatedThunk = () => {
    console.log('authorizated user')
    if (localStorage.getItem("hash")) {
        const id = localStorage.getItem("id")
        return function (dispatch) {
            return API(GET, 'user/' + id)
                .then(res => {
                    dispatch(authorization('You are already authorizated', 'none', 'Log out', res.user))
                }, err => {
                    dispatch(authorization(err.message, 'flex', 'Submit', {}))
                })
        }
    } else {
        return function (dispatch) {
            dispatch(authorization('Log in', 'flex', 'Submit', {}))
        }
    }
}

export const setChangesThunk = event => {
    console.log('change input')
    if (event.target.name === 'email') {
        return function (dispatch) {
            dispatch(editLogin(event.target.value))
        }
    } else {
        return function (dispatch) {
            dispatch(editPassword(event.target.value))
        }
    }
}