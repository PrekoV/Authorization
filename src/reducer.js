import consts from './consts'

const initialState = {
    title: '',
    user: {},
    btn: '',
    login: '',
    pass: '',
    displayInput: ''
}

export default function reducer(state = initialState, action) {
    let tempState = { ...state }
    console.log(action)
    switch (action.type) {
        case "EDIT_TITLE":
            // console.log(tempState)
            tempState.title = action.text
            // return { ...state, title: action.text }
            return tempState
        case consts.EDIT_BTN:
            tempState.btn = action.text
            return tempState
        case consts.EDIT_DISPLAY_INPUT:
            tempState.displayInput = action.text
            return tempState
        case consts.EDIT_LOGIN:
            tempState.login = action.text
            return tempState
        case consts.EDIT_PASSWORD:
            tempState.pass = action.text
            return tempState
        case consts.ADD_USER:
            tempState.user = action.data
            return tempState
        default: return state
    }
}

