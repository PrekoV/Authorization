import { AUTHORIZATION } from '../../consts'

const initialState = {
    loading: false,
    isAuthorizated: false,
    user: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTHORIZATION:
            return {
                ...state,
                isAuthorizated: action.isAuthorizated,
                user: action.user
            }
        default: return state
    }
}