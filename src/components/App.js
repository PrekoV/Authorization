import React, { Component } from 'react'
import './styles/App.css'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import HomePage from './homePage'
import { withRouter } from 'react-router'
import AuthPage from './authPage'


const mapStateToProps = state => {
	return {
		isAuth: state.authResultsReducer.isAuth,
		user: state.authResultsReducer.user
	}
}

const PrivateRoute = ({ component: Component, isAuthorizated, ...rest }) => (
	<Route {...rest} render={() => (isAuthorizated ? <Component /> : <Redirect to='/auth' />)} />
)

class App extends Component {
	componentDidMount = () => { this.props.history.push('/home') }

	render() {
		console.log("render App", this.props.isAuth)
		return (
			<div className="App">
				<div className="header">
					<h3 className="hello">
						{!this.props.isAuth ? 'You have to be authorized to view the site' : 'Welcome, ' + this.props.user.firstName}
					</h3>
				</div>
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
