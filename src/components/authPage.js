import React, { Component } from 'react'
import { emailPattern } from '../consts'

class AuthPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Authorization',
            btn: 'Submit',
            login: '',
            password: ''
        }
        this.auth = this.auth.bind(this)
        this.setChange = this.setChange.bind(this)
    }

    auth = e => {
        e.preventDefault()
        let login = this.state.login
        let password = this.state.password
        this.setState({ loading: true })
        if (login && password) {
            console.log("Input values: ", login, " ", password)
            if (emailPattern.test(login)) {
                this.props.submitAuthorizationThunk(login, password)
            }
            //     else {
            //         this.props.submitErrorData('✖ E-mail is not currect')
            //     }
            // } else {
            //     this.props.submitErrorData('✖ Please, input loging and E-mail')
        }
    }

    setChange = event => {
        console.log('change input')
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        console.log('render authPage')
        return (
            <div className="AuthPage">
                <div className="access">
                    <div className="header">
                        <h3>{this.state.title}</h3>
                        <div className="message" style={{ color: 'red' }}>{this.props.err}</div>
                    </div>
                    <form action="" onSubmit={this.auth}>
                        <div className="block">
                            <span className="text">Email</span>
                            <input type="email" name="login" placeholder="Email" id="login" onChange={this.setChange} />
                        </div>
                        <div className="block">
                            <span className="text">Password</span>
                            <input type="password" name="password" placeholder="Password" id="pass" onChange={this.setChange} />
                        </div>
                        <div className="btnWrapper">
                            <button className="submit">{this.state.btn}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AuthPage;