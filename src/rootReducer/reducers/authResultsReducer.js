import { AUTHORIZATION } from '../../consts'

const initialState = {
    title: '',
    btn: '',
    displayInput: '',
    user: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTHORIZATION:
            return {
                ...state,
                title: action.title,
                displayInput: action.displayInput,
                btn: action.btn,
                user: action.user
            }
        default: return state
    }
}