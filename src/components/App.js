import React, { Component } from 'react'
import './styles/App.css'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthPage from './authPage'
import HomePage from './homePage'
import { withRouter } from 'react-router'


const mapStateToProps = state => {
	return { isAuth: state.authResultsReducer.isAuth }
}

const PrivateRoute = ({ component: Component, isAuthorizated, ...rest }) => (
	<Route {...rest} render={() => (
		isAuthorizated === true
			? <Component />
			: <Redirect to='/auth' />
	)} />
)

class App extends Component {
	componentDidMount = () => { this.props.history.push('/home') }

	render() {
		console.log("render App")
		return (
			<div className="App">
				<Route path="/auth" component={AuthPage} />
				<PrivateRoute path="/home" isAuthorizated={this.props.isAuth} component={HomePage} />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps)(App));


/*
					<PrivateRoute path='/auth' isauth=true comonent={() => <AuthPage
						err={this.props.authResults.err}
						submitAuthorizationThunk={this.props.submitAuthorizationThunk}
						submitErrorData={this.props.submitErrorData} />} />
					<Route path='/home' render={() => <HomePage
						user={this.props.authResults.user}
						//submitAuthorizatedThunk={this.props.submitAuthorizatedThunk}
						submitLogOutThunk={this.props.submitLogOutThunk} />} />
*/
