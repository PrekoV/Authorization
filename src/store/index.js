import thunk from 'redux-thunk'
import rootReducer from '../rootReducer/rootReducer'
import { createStore, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

//const middleware = [thunk, routerMiddleware(history)]

export const store = createStore(connectRouter(history)(rootReducer), applyMiddleware(thunk, routerMiddleware(history)))