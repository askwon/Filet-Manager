import React, { Component } from 'react'
import Draggable from 'react-draggable'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as LoginActions from '../actions/login.js';

function mapStateToProps(state) {
    return {
        login: state.login
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(LoginActions, dispatch)
    };
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
	        deltaPosition: {
	          top: 0, left: 0
	        },
	        activeDrags: 0,
            hostname: "",
            port: "",
            username: "",
            password: ""
        }
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
        this.handleEnterKey = this.handleEnterKey.bind(this);
        this.handleConnectClick = this.handleConnectClick.bind(this);
    }

	static defaultProps() {
	    return {
	        connId  : 0,
	    }
	}
	
	handleDrag(e, ui) {
	    var left = this.state.postition.left;
	    var top = this.state.postition.top;
	    this.setState({
	        deltaPosition: {
	          left: left + ui.deltaX,
	          top: top + ui.deltaY,
	        }
	    });
	}
	
    onStart() {
        this.setState({
            activeDrags: ++this.state.activeDrags
        });
	}
	
    onStop() {
        this.setState({
            activeDrags: --this.state.activeDrags
        });
	}
	
	handleEnterKey(ev) {
	    if(ev.keyCode == 13) {
                // sftpConnect(this.props.connId);
            let credentials = {
                hostname: this.state.hostname,
                port    : this.state.port,
                username: this.state.username,
                password: this.state.password
            };
            this.props.actions.loginRequest(this.props.connId, credentials);
	    }
	}

	handleClearClick() { clean() }
	handleConnectClick() { connect(this.props.connId) }
    handleChange(input, evt) {
        var nextState = {};
        nextState[input] = evt.target.value;
        this.setState(nextState);
    }
	
    render() {
        var drags = {onStart: this.onStart, onStop: this.onStop};
        var {top, left} = this.state.deltaPosition; 
        var props = {
            type        : "text",
            className   : "login-input",
        };
        return (
            <Draggable bounds="parent" handle="strong" {...drags}>
                <div id={this.props.connId} className="login">
                    <strong className="menubar" > Remote Host Login </strong>
                    <input id="hostname" placeholder="Hostname" {...props}
                            onKeyDown={this.handleEnterKey} value={this.state.hostname} 
                            onChange={this.handleChange.bind(this, "hostname")} />
                    <input id="port" placeholder="Port" {...props}
                            onKeyDown={this.handleEnterKey} value={this.state.port}
                            onChange={this.handleChange.bind(this, "port")} />
                    <input id="username" placeholder="Username" {...props}
                            onKeyDown={this.handleEnterKey} value={this.state.username}
                            onChange={this.handleChange.bind(this, "username")} />
                    <input id="password" type="password" placeholder="Password" 
                            onKeyDown={this.handleEnterKey} className="login-input" 
                            value={this.state.password} onChange={this.handleChange.bind(this, "password")} />

                    <div id="login-buttons">
                            <button id="clear-btn" onClick={this.handleClearClick} 
                            type="submit" className="login-button"> Clear </button>
                         <button id="connect-btn" onClick={this.handleConnectClick}
                            type="submit" className="login-button"> Connect </button>
                    </div>
	            </div>
    	    </Draggable>
        );
    }
};

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login)
