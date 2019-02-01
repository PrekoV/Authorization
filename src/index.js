import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store, history } from './store'
import App from './components/App';
import { Router, Route, Switch } from 'react-router-dom'
// import AuthPage from './components/authPage'

//store.subscribe(() => { console.log(store); });

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/" component={App} />
                {/* <Route path="/*" component={() => <div className="hello">Sorry, there is no page like this</div>} /> */}
            </Switch>
        </Router>
    </Provider>, document.getElementById('root')
);