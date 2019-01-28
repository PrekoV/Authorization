import React, { Component } from 'react'

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'Welcome, ' + this.props.authResults.user.firstName,
            btn: 'Log out'
        }
        this.auth = this.auth.bind(this)
    }

    componentDidMount = () => {
        console.log('dddddddddd', this.props)
        this.props.submitAuthorizatedThunk()
    }

    auth = e => {
        e.preventDefault()
        this.props.submitAuthorizationThunk()
    }

    render() {
        const { authResults } = this.props
        console.log("render homePage ")
        return (
            <div className="HomePage">
                <div className="access">
                    <div className="header">
                        <h3>{this.state.title}</h3>
                    </div>
                    <form action="" onSubmit={this.auth}>
                        <div className="info">
                            name: {authResults.user.firstName} {authResults.user.lastName}
                        </div>
                        <div className="info">
                            age: {authResults.user.age}
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

export default HomePage;