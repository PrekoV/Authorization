import { combineReducers } from 'redux'
import loginAndPasswordReducer from './reducers/loginAndPasswordReducer'
import authResultsReducer from './reducers/authResultsReducer'

export default combineReducers({
    loginAndPasswordReducer,
    authResultsReducer
})

