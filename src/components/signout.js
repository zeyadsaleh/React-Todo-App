import React, { Component } from "react";
import {withRouter } from "react-router-dom";


class Logout extends Component {
    render() {
        localStorage.removeItem('token');
        this.props.isLoggedin(false);
        return this.props.history.push("/home");
    }
}

export default withRouter(Logout);