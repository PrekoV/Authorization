import { emailPattern, POST, GET } from '../consts'
import { authorization } from './actions'
import API from '../connect/api'

export const authorizationThunk = (login, pass) => {
    console.log('authorization')
    console.log(login, pass)
    if (!localStorage.getItem("hash") && login && pass) {
        console.log("Input values: " + login + " " + pass)
        if (emailPattern.test(login)) {
            return function (dispatch) {
                return API(POST, 'token/', { email: login, password: pass })
                    .then(res => {
                        localStorage.setItem("hash", res.token.hash)
                        localStorage.setItem("id", res.user.id)
                        dispatch(authorization(true, res.user))
                    }, err => { console.log(err.message) })
                    // .then(() => {
                    //     document.getElementById("login").value = ''
                    //     document.getElementById("pass").value = ''
                    .catch(e => {
                        console.log(e.message)
                        dispatch(authorization(false, {}))
                    })
            }
        }
    } else {
        localStorage.clear()
        return function (dispatch) {
            dispatch(authorization(false, {}))
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
                    dispatch(authorization(true, res.user))
                }, err => {
                    dispatch(authorization(false, {}))
                    console.log(err.message)
                })
        }
    } else {
        return function (dispatch) {
            dispatch(authorization(false, {}))
        }
    }
}