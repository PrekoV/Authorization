import React, { Component } from 'react'
import './App.css'
import API from './api'
import { connect } from 'react-redux'
import consts from './consts'
import actions from './actions'


const authorizationThunk = (login, pass) => {
	console.log('1')
	const POST = 'POST'
	if (!localStorage.getItem("hash") && login && pass) {
		console.log("Input values: " + login + " " + pass)
		if (consts.emailPattern.test(login)) {
			return function (dispatch) {
				return API(POST, 'token/', { email: login, password: pass })
					.then(res => {
						localStorage.setItem("hash", res.token.hash)
						localStorage.setItem("id", res.user.id)
						Promise.all([
							dispatch(actions.editTitle('Welcome, ' + res.user.firstName + "!")),
							dispatch(actions.editBtn('Log out')),
							dispatch(actions.editDisplayInput('none')),
							dispatch(actions.editLogin(login)),
							dispatch(actions.editPassword(pass)),
							dispatch(actions.addUser(res.user))
						])
					}, err => { console.log(err.message) })
					.then(() => {
						document.getElementById("login").value = ''
						document.getElementById("pass").value = ''
					}).catch(e => {
						console.log(e.message)
						dispatch(actions.editTitle('Invalid login or password'))
					})
			}
		}
	} else {
		localStorage.clear()
		return function (dispatch) {
			dispatch(actions.editTitle('Log in'))
			setTimeout(function () { dispatch(actions.editBtn('Submit')) }, 1000)
			setTimeout(function () { dispatch(actions.editDisplayInput('flex')) }, 2000)
		}
	}
}

const authorizatedThunk = () => {
	console.log('2')
	if (localStorage.getItem("hash")) {
		const id = localStorage.getItem("id")
		return function (dispatch) {
			return API('GET', 'user/' + id)
				.then(res => {
					console.log(res)
					Promise.all([
						dispatch(actions.addUser(res.user)),
						dispatch(actions.editTitle('You are already authorizated')),
						dispatch(actions.editBtn('Log out')),
						dispatch(actions.editDisplayInput('none'))
					])
				}, err => {
					dispatch(actions.editTitle(err.message))
				})
		}
	} else {
		return function (dispatch) {
			dispatch(actions.editTitle('Log in'))
			setTimeout(function () { dispatch(actions.editBtn('Submit')) }, 1000)
			setTimeout(function () { dispatch(actions.editDisplayInput('flex')) }, 2000)
		}
	}
}

const setChangesThunk = event => {
	console.log('3')
	if (event.target.name === 'email') {
		return function (dispatch) {
			dispatch(actions.editLogin(event.target.value))
		}
	} else {
		return function (dispatch) {
			dispatch(actions.editPassword(event.target.value))
		}
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
		this.props.submitAuthorizationThunk(this.props.state.login, this.props.state.pass)
	}

	setChange = e => { this.props.submitChangesThunk(e) }

	render() {
		console.log("kkkk", this.props.wtf)
		return (
			<div className="App">
				<div className="access">
					<div className="header">
						<h3>{console.log("kp", this.props.wtf.title)}</h3>
					</div>
					<form action="" onSubmit={this.auth}>
						<div className="block" style={{ display: this.props.wtf.displayInput }}>
							<span className="text" >Email</span>
							<input type="email" name="email" placeholder="Email" id="login" onChange={this.setChange} />
						</div>
						<div className={`info ${this.props.wtf.displayInput === 'none' ? 'showInfo' : ''}`}>
							name: {this.props.wtf.user.firstName} {this.props.wtf.user.lastName}
						</div>
						<div className="block" style={{ display: this.props.wtf.displayInput }}>
							<span className="text">Password</span>
							<input type="password" name="pass" placeholder="Password" id="pass" onChange={this.setChange} />
						</div>
						<div className={`info ${this.props.wtf.displayInput === 'none' ? 'showInfo' : ''}`}>
							age: {this.props.wtf.user.age}
						</div>
						<div className="btnWrapper">
							<button className="submit">{this.props.wtf.btn}</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log("state", state)
	return { wtf: state }
}

const mapDispatchToProps = (dispatch) => {
	return {
		submitAuthorizatedThunk: () => dispatch(authorizatedThunk()),
		submitAuthorizationThunk: (login, pass) => { dispatch(authorizationThunk(login, pass)) },
		submitChangesThunk: (e) => { dispatch(setChangesThunk(e)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
