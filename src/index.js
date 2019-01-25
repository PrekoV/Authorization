import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './components/App';
import thunk from 'redux-thunk'
import rootReducer from './rootReducer/rootReducer'

const store = createStore(rootReducer, applyMiddleware(thunk))

//store.subscribe(() => { console.log(store); });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));