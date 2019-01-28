import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './components/App';
import thunk from 'redux-thunk'
import rootReducer from './rootReducer/rootReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const store = createStore(rootReducer, applyMiddleware(thunk))
const number = 2

//store.subscribe(() => { console.log(store); });

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/authorizationTask" component={App} number={number}>
            </Route>
        </Router>
    </Provider>, document.getElementById('root')
);