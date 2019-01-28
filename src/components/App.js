import React, { Component } from 'react'
import './styles/App.css'
import { connect } from 'react-redux'
import { authorizationThunk, authorizatedThunk } from '../actions/actionsCreators'
import AuthPage from './authPage'
import HomePage from './homePage'

const mapStateToProps = state => {
	console.log(state)
	return {
		authResults: state.authResultsReducer
	}
}

const mapDispatchToProps = dispatch => {
	return {
		submitAuthorizatedThunk: () => dispatch(authorizatedThunk()),
		submitAuthorizationThunk: (login, pass) => { dispatch(authorizationThunk(login, pass)) },
	}
}

class App extends Component {

	componentDidMount = () => { this.props.submitAuthorizatedThunk() }

	render() {
		console.log("render: ", this.props)
		return (
			<div className="App">
				{
					this.props.authResults.isAuthorizated === false ?
						<AuthPage authResults={this.props.authResults} submitAuthorizationThunk={this.props.submitAuthorizationThunk} /> :
						<HomePage
							authResults={this.props.authResults}
							submitAuthorizatedThunk={this.props.submitAuthorizatedThunk}
							submitAuthorizationThunk={this.props.submitAuthorizationThunk} />
				}

				{/* <div className="access">
					<div className="header">
						<h3>{this.props.authResults.title}</h3>
					</div>
					<form action="" onSubmit={this.auth}>
						<div className="block" style={{ display: this.props.authResults.displayInput }}>
							<span className="text" >Email</span>
							<input type="email" name="email" placeholder="Email" id="login" onChange={this.setChange} />
						</div>
						<div className={`info ${this.props.authResults.displayInput === 'none' ? 'showInfo' : ''}`}>
							name: {this.props.authResults.user.firstName} {this.props.authResults.user.lastName}
						</div>
						<div className="block" style={{ display: this.props.authResults.displayInput }}>
							<span className="text">Password</span>
							<input type="password" name="pass" placeholder="Password" id="pass" onChange={this.setChange} />
						</div>
						<div className={`info ${this.props.authResults.displayInput === 'none' ? 'showInfo' : ''}`}>
							age: {this.props.authResults.user.age}
						</div>
						<div className="btnWrapper">
							<button className="submit">{this.props.authResults.btn}</button>
						</div>
					</form>
				</div> */}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);