import React, { Component } from 'react';
import './App.css'
import API from './api'

class App extends Component {

	state = {
		hash: '',
		title: '',
		user: {},
		btn: ''
	}

	componentDidMount = () => {
		if (localStorage.getItem("hash")) {
			API(null, null, null, localStorage.getItem("hash"), localStorage.getItem("userId"))
				.then(json => {
					console.log(json.user.firstName)
					console.log(localStorage.getItem("hash"))
					this.setState({ user: json.user, title: 'Authorizated: ' + json.user.firstName, btn: 'Log out' })
				})
		} else {
			this.setState({ title: 'Log in', btn: 'Submit' })
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
					this.setState({ title: 'Welcome, ' + json.user.firstName + "!", user: json.user, btn: 'Log out' })
					localStorage.setItem("hash", json.token.hash)
					localStorage.setItem("userId", json.user.id)
					document.getElementById("login").value = ''
					document.getElementById("pass").value = ''

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
			localStorage.clear()
			this.setState({ hash: '', title: 'Log in', btn: 'Submit' })
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
						<button className="submit" onClick={() => this.auth()}>{this.state.btn}</button>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
