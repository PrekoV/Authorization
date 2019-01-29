import React, { Component } from 'react'
import './styles/App.css'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { authorizationThunk, authorizatedThunk, logOutThunk, setErrorData } from '../actions/actionsCreators'
import AuthPage from './authPage'
import HomePage from './homePage'
import { withRouter } from 'react-router'


const mapStateToProps = state => {
	console.log(state)
	return { authResults: state.authResultsReducer }
}

const mapDispatchToProps = dispatch => {
	return {
		submitAuthorizatedThunk: () => dispatch(authorizatedThunk()),
		submitAuthorizationThunk: (login, pass) => { dispatch(authorizationThunk(login, pass)) },
		submitLogOutThunk: () => dispatch(logOutThunk()),
		submitErrorData: (error) => dispatch(setErrorData(error))
	}
}

class App extends Component {
	componentDidMount = () => {
		localStorage.getItem("hash") ? this.props.history.push('/home') : this.props.history.push('/auth')
	}

	render() {
		console.log("render App")
		return (
			<div className="App">
				<Switch>
					<Route path='/auth' render={() => <AuthPage
						err={this.props.authResults.err}
						loading={this.props.authResults.loading}
						submitAuthorizationThunk={this.props.submitAuthorizationThunk}
						submitErrorData={this.props.submitErrorData} />} />
					<Route path='/home' render={() => <HomePage
						user={this.props.authResults.user}
						submitAuthorizatedThunk={this.props.submitAuthorizatedThunk}
						submitLogOutThunk={this.props.submitLogOutThunk} />} />
				</Switch>
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));