import thunk from 'redux-thunk'
import rootReducer from '../rootReducers/rootReducer'
import { createStore, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension';

export const history = createHistory()

//const middleware = [thunk, routerMiddleware(history)]

export const store = createStore(connectRouter(history)(rootReducer), composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))))