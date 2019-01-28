import { AUTHORIZATION, ERROR_DATA } from '../../consts'

const initialState = {
    user: {},
    err: ''
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTHORIZATION:
            return {
                ...state,
                user: action.user
            }
        case ERROR_DATA:
            return {
                ...state,
                err: action.err
            }
        default: return state
    }
}
