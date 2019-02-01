import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logOutThunk, authorizatedThunk } from '../rootReducers/actions/actionsCreators'

const mapStateToProps = state => {
    return {
        user: state.authResultsReducer.user,
        err: state.authResultsReducer.err,
        isAuth: state.authResultsReducer.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitLogOutThunk: () => dispatch(logOutThunk()),
        submitAuthorizatedThunk: () => dispatch(authorizatedThunk())
    }
}

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Account information about ',
            btn: 'Log out'
        }
        this.logOut = this.logOut.bind(this)
    }

    componentWillMount = () => {
        if (!this.props.user.id) {
            console.log("gg")
            this.props.submitAuthorizatedThunk()
        }
    }

    logOut = e => {
        e.preventDefault()
        this.props.submitLogOutThunk()
    }

    render() {
        const { user, err } = this.props
        console.log("render homePage ")
        return (
            <div className="HomePage">
                <div className="access">
                    <div className="title">
                        <h3>{err ? err : user.firstName ? this.state.title + " " + user.firstName : 'Loading...'}</h3>
                    </div>
                    <form action="" onSubmit={this.logOut}>
                        <div className="info">
                            name: {!err ? user.firstName + " " + user.lastName : 'Loading...'}
                        </div>
                        <div className="info">
                            age: {!err ? user.age : 'Loading...'}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);