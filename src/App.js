import React, { Component } from 'react';
import './App.css'
import API from './api'

class App extends Component {

	state = {
		hash: '',
		title: 'Log in',
		user: {}
	}

	componentDidMount = () => {
		if (localStorage.getItem("hash")) {
			let currentState = this.state
			currentState.hash = localStorage.getItem("hash")
			API(null, null, null, currentState.hash, localStorage.getItem("userId"))
				.then(json => {
					console.log(json.user.firstName)
					currentState.user = json.user
				})
			currentState.title = 'You have been already authorized!'
			console.log(currentState)

			this.setState({ state: currentState })
		}
	}

	auth = () => {
		var login = document.getElementById("login").value
		var pass = document.getElementById("pass").value
		var POST = 'POST'

		console.log(login + " " + pass)

		if (!localStorage.getItem("hash")) {
			API(POST, login, pass)
				.then(json => {
					this.setState({ hash: json.token.hash, title: 'Welcome, ' + json.user.firstName + "!", user: json.user })
					document.getElementById("login").value = ''
					document.getElementById("pass").value = ''
					console.log(this.state.hash)
					return this.state
				}).then(state => {
					localStorage.setItem("hash", state.hash)
					localStorage.setItem("userId", state.user.id)
					console.log(state)
				}).catch(error => {
					console.log(error)
					this.setState({ title: 'Invalid username or password' })
				})
		} else {
			console.log(localStorage.getItem("hash"))
			this.setState({ title: 'You have been already authorized!' })
		}
	}

	clearLocalStorage = () => {
		if (localStorage.getItem("hash")) {
			localStorage.clear()
			this.setState({ hash: '', title: 'Log in' })
		}
	}

	render() {
		return (
			<div className="App">
				<div className="access">
					<div className="header">
						<h1>{this.state.title}</h1>
					</div>
					<form action="">
						<span className="text">Email</span>
						<input type="email" placeholder="Email" id="login" />
						<br />
						<span className="text">Password</span>
						<input type="password" placeholder="Password" id="pass" />
					</form>
					<button className="submit" onClick={() => this.auth()}>Submit</button>
					<button className={`submit ${this.state.hash === '' ? 'passive' : ''}`}
						onClick={() => this.clearLocalStorage()}>
						Log out
					</button>
				</div>
			</div>
		);
	}
}

export default App;
