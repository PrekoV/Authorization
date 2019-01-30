import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logOutThunk } from '../actions/actionsCreators'

const mapStateToProps = state => { return { user: state.authResultsReducer.user } }

const mapDispatchToProps = dispatch => { return { submitLogOutThunk: () => dispatch(logOutThunk()) } }

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Welcome,',
            btn: 'Log out'
        }
        this.logOut = this.logOut.bind(this)
    }

    logOut = e => {
        e.preventDefault()
        this.props.submitLogOutThunk()
    }

    render() {
        const { user } = this.props
        console.log("render homePage ")
        return (
            <div className="HomePage">
                <div className="access">
                    <div className="header">
                        <h3>{this.state.title} {user.firstName ? user.firstName : 'Loading...'}</h3>
                    </div>
                    <form action="" onSubmit={this.logOut}>
                        <div className="info">
                            name: {user.firstName && user.lastName ? user.firstName + " " + user.lastName : 'Loading...'}
                        </div>
                        <div className="info">
                            age: {user.age ? user.age : 'Loading...'}
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