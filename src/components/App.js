import React, { Component } from 'react'
import './styles/App.css'
import { connect } from 'react-redux'
import { authorizationThunk, authorizatedThunk, setChangesThunk } from '../actions/actionsCreators'

const mapStateToProps = state => {
	console.log(state)
	return {
		authResults: state.authResultsReducer,
		loginAndPass: state.loginAndPasswordReducer
	}
}

const mapDispatchToProps = dispatch => {
	return {
		submitAuthorizatedThunk: () => dispatch(authorizatedThunk()),
		submitAuthorizationThunk: (login, pass) => { dispatch(authorizationThunk(login, pass)) },
		submitChangesThunk: (e) => { dispatch(setChangesThunk(e)) }
	}
}

class App extends Component {
	constructor(props) {
		super(props)
		this.auth = this.auth.bind(this)
		this.setChange = this.setChange.bind(this)
	}

	componentDidMount = () => { this.props.submitAuthorizatedThunk() }

	auth = e => {
		e.preventDefault()
		this.props.submitAuthorizationThunk(this.props.loginAndPass.login, this.props.loginAndPass.pass)
	}

	setChange = e => { this.props.submitChangesThunk(e) }

	render() {
		console.log("render: ", this.props)
		return (
			<div className="App">
				<div className="access">
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
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);