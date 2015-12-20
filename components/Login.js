import React, { Component, PropTypes } from 'react'
import Input from 'react-bootstrap/lib/Input';
import ButtonInput from 'react-bootstrap/lib/ButtonInput';
import Panel from 'react-bootstrap/lib/Panel';


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.handleGoClick = this.handleGoClick.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setInputValue(nextProps.value)
        }
    }

    getInputValue() {
        return this.refs.input.value
    }

    setInputValue(val) {
        this.refs.input.value = val
    }

    handleKeyUp(e) {
        if (e.keyCode === 13) {
            this.handleGoClick()
            return false;
        }
        else {
            this.setState({val: e.target.value})
        }
    }

    handleGoClick(e) {
        this.props.onChange(this.state.val)
    }

    a() {
        return false;
    }
    render() {
        return (
            <div>
                <Panel header={"GPS Tracker Login"} bsStyle="info">
                    <Input type="text" placeholder="User Name" onKeyUp={this.handleKeyUp}/>
                    <ButtonInput bsStyle="info" value="Login" onClick={this.handleGoClick}/>
                </Panel>
            </div>
        )
    }
}

Login.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}