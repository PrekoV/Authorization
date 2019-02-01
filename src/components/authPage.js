import React, { Component } from 'react'
import { emailPattern } from '../consts'
import { connect } from 'react-redux'
import { authorizationThunk, setErrorData } from '../rootReducers/actions/actionsCreators'

const mapStateToProps = state => { return { err: state.authResultsReducer.err } }

const mapDispatchToProps = dispatch => {
    return {
        submitAuthorizationThunk: (login, pass) => { dispatch(authorizationThunk(login, pass)) },
        submitErrorData: (error) => dispatch(setErrorData(error))
    }
}

class AuthPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Authorization',
            btn: 'Submit',
            login: '',
            password: '',
            loading: false
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
                this.props.submitErrorData('')
                this.props.submitAuthorizationThunk(login, password)
                this.setState({ password: '' })
            }
        } else {
            this.setState({ loading: false })
            this.props.submitErrorData('✖ Please, input E-mail and password')
        }
    }

    setChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        console.log('render authPage')
        return (
            <div className="AuthPage">
                <div className="access">
                    <div className="title">
                        <h3>{this.state.title}</h3>
                        <div className="message">{this.state.loading && !this.props.err && 'Loading...'}</div>
                        <div className="message" style={{ color: 'red' }}>{this.props.err}</div>
                    </div>
                    <form onSubmit={this.auth}>
                        <div className="block">
                            <span className="text">Email</span>
                            <input type="email" name="login" placeholder="Email" id="login" onChange={this.setChange} />
                        </div>
                        <div className="block">
                            <span className="text">Password</span>
                            <input type="password" name="password" value={this.state.password} placeholder="Password" id="pass" onChange={this.setChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);