import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import Login from '../components/Login'
import { resetErrorMessage } from '../actions'

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleDismissClick = this.handleDismissClick.bind(this)
    }

    handleDismissClick(e) {
        this.props.resetErrorMessage()
        e.preventDefault()
    }

    handleChange(nextValue) {
        this.props.pushState(null, `/guardians/${nextValue}`)
    }

    renderErrorMessage() {
        const { errorMessage } = this.props
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{ backgroundColor: '#e99', padding: 10 }}>
                <b>{errorMessage}</b>
                {' '}
                (<a href="#"
                    onClick={this.handleDismissClick}>
                Dismiss
            </a>)
            </p>
        )
    }

    render() {
        const { inputValue } = this.props
        return (
            <div>
                <Login
                    onChange={this.handleChange}/>
                <hr />
                {this.renderErrorMessage()}
            </div>
        )
    }
}

LoginPage.propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,

}

function mapStateToProps(state) {
    return {
        errorMessage: state.errorMessage,
        inputValue: state.router.location.pathname.substring(1)
    }
}

export default connect(mapStateToProps, {
    resetErrorMessage,
    pushState
})(LoginPage)
