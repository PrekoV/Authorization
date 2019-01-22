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
			API(null, null, null, localStorage.getItem("hash"), localStorage.getItem("userId"))
				.then(json => {
					console.log(json.user.firstName)
					console.log(localStorage.getItem("hash"))
					this.setState({ user: json.user, title: 'Authorizated: ' + json.user.firstName })
				})
		}
	}

	auth = () => {
		var login = document.getElementById("login").value
		var pass = document.getElementById("pass").value
		var POST = 'POST'

		console.log("Input values: " + login + " " + pass)

		if (!localStorage.getItem("hash")) {
			API(POST, login, pass)
				.then(json => {
					this.setState({ hash: json.token.hash, title: 'Welcome, ' + json.user.firstName + "!", user: json.user })
					console.log(this.state.hash)
					return this.state
				}).then(state => {
					localStorage.setItem("hash", state.hash)
					localStorage.setItem("userId", state.user.id)
					document.getElementById("login").value = ''
					document.getElementById("pass").value = ''
					console.log(state)

					// проверка: действительно ли пользователь в сети?
					// при удачной авторизации можно просматривать данные других пользователей
					//
					//	return this.state
					// }).then(state => {
					// 	return API(null, null, null, state.hash, state.user.id)
					// }).then(json => {
					// 	console.log(json)

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
						<h3>{this.state.title}</h3>
					</div>
					<form action="">
						<div className="block">
							<span className="text">Email</span>
							<input type="email" placeholder="Email" id="login" />
						</div>
						<div className="block">
							<span className="text">Password</span>
							<input type="password" placeholder="Password" id="pass" />
						</div>
					</form>
					<div className="btnWrapper">
						<button className="submit" onClick={() => this.auth()}>Submit</button>
						<button className={`submit ${localStorage.getItem("hash") || this.state.hash ? '' : 'passive'}`}
							onClick={() => this.clearLocalStorage()}>
							Log out
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
