import React, { Component } from 'react'

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
        console.log(this.state.login, this.state.password)
        this.props.submitAuthorizationThunk(this.state.login, this.state.password)
    }

    setChange = event => {
        console.log('change input')
        if (event.target.name === 'email') {
            this.setState({ login: event.target.value })
        } else {
            this.setState({ password: event.target.value })
        }
    }

    render() {
        console.log('render uathPage', this.props)
        return (
            <div className="AuthPage">
                <div className="access">
                    <div className="header">
                        <h3>{this.state.title}</h3>
                    </div>
                    <form action="" onSubmit={this.auth}>
                        <div className="block">
                            <span className="text">Email</span>
                            <input type="email" name="email" placeholder="Email" id="login" onChange={this.setChange} />
                        </div>
                        <div className="block">
                            <span className="text">Password</span>
                            <input type="password" name="pass" placeholder="Password" id="pass" onChange={this.setChange} />
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