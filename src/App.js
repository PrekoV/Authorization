import React, { Component } from 'react';
import './App.css'
import axios from './api'
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
			const id = localStorage.getItem("id")
			axios.get(`user/${id}`)
				.then(res => {
					console.log(res.data.user.firstName)
					this.setState({
						user: res.data.user,
						title: 'You are already authorizated',
						btn: 'Log out',
						displayInput: 'none'
					})
				}, err => {
					this.setState({ title: err.message })
				})
		} else {
			this.setState({ title: 'Log in', btn: 'Submit', displayInput: 'flex' })
		}
	}

	auth = e => {
		e.preventDefault()

		const hash = localStorage.getItem("hash")

		if (hash === null || hash === '') {
			const login = this.state.login
			const pass = this.state.pass
			console.log("Input values: " + login + " " + pass)
			if (emailPattern.test(login)) {
				axios.post('token/', { email: login, password: pass })
					.then(res => {
						//	console.log(res)
						this.setState({
							title: 'Welcome, ' + res.data.user.firstName + "!",
							user: res.data.user,
							btn: 'Log out',
							displayInput: 'none',
							login: '',
							pass: ''
						})
						document.getElementById("login").value = ''
						document.getElementById("pass").value = ''
					}, err => { console.log(err.message) })
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
