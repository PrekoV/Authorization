import React, { Component } from 'react';
import './App.css'
import API from './api'
const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

class App extends Component {
	state = {
		title: '',
		user: {},
		btn: '',
		login: '',
		pass: '',
		displayInput: ''
	}

	componentDidMount = () => {
		if (localStorage.getItem("hash")) {
			const hash = localStorage.getItem("hash")
			const id = localStorage.getItem("userId")
			API('GET', 'user/' + id)
				.then(json => {
					console.log(json.user.firstName)
					console.log(hash)
					this.setState({
						user: json.user,
						title: 'You are already authorizated',
						btn: 'Log out',
						displayInput: 'none'
					})
				})
		} else {
			this.setState({ title: 'Log in', btn: 'Submit', displayInput: 'flex' })
		}
	}

	auth = e => {
		e.preventDefault()

		const login = this.state.login
		const pass = this.state.pass
		const POST = 'POST'
		const hash = localStorage.getItem("hash")

		console.log("Input values: " + login + " " + pass)

		if (hash === null || hash === '') {
			console.log(emailPattern.test(this.state.login))
			if (emailPattern.test(login)) {
				API(POST, 'token', { email: login, password: pass })
					.then(json => {
						this.setState({
							title: 'Welcome, ' + json.user.firstName + "!",
							user: json.user,
							btn: 'Log out',
							displayInput: 'none',
							login: '',
							pass: ''
						})
						localStorage.setItem("hash", json.token.hash)
						localStorage.setItem("userId", json.user.id)

						document.getElementById("login").value = ''
						document.getElementById("pass").value = ''
					}, err => {
						console.log(err.message)
					}).catch(error => {
						console.log(error)
						this.setState({ title: 'Invalid username or password' })
					})
			}
		} else {
			localStorage.clear()
			this.setState({ hash: '', title: 'Log in', btn: 'Submit', displayInput: 'flex', })
		}

	}

	setChange = e => {
		if (e.target.name === 'email') {
			if (emailPattern.test(e.target.value)) {
				this.setState({ login: e.target.value })
			}
		} else {
			this.setState({ pass: e.target.value })
		}
	}

	render() {
		return (
			<div className="App">
				<div className="access">
					<div className="header">
						<h3>{this.state.title}</h3>
					</div>
					<form action="" onSubmit={this.auth}>
						<div className="block" style={{ display: this.state.displayInput }}>
							<span className="text" >Email</span>
							<input type="email" name="email" placeholder="Email" id="login" onChange={this.setChange} />
						</div>
						<div className={`info ${this.state.displayInput === 'none' ? 'showInfo' : ''}`}>
							name: {this.state.user.firstName} {this.state.user.lastName}
						</div>
						<div className="block" style={{ display: this.state.displayInput }}>
							<span className="text">Password</span>
							<input type="password" name="pass" placeholder="Password" id="pass" onChange={this.setChange} />
						</div>
						<div className={`info ${this.state.displayInput === 'none' ? 'showInfo' : ''}`}> age: {this.state.user.age}</div>
						<div className="btnWrapper">
							<button className="submit">{this.state.btn}</button>
						</div>
					</form>

				</div>
			</div>
		);
	}
}

export default App;
