import React, { Component } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isLoading: false,
            invalid: true

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const url = "http://todoapp.ahmedrohym.com/api.php?apicall=login";
        const data = {
            username: this.state.username,
            password: this.state.password,
        }
        this.setState({
            isLoading: true,
        });

        // Post request to backend
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.user) {
                    this.props.isLoggedin(true)
                    localStorage.setItem('token', data.user.token);
                    // redirect to home page
                    this.props.history.push("/home")
                }
                else {
                    this.state.invalid = true
                }
                this.setState({
                    responseObject: data,
                    isLoading: false,
                });
            })
            .catch((error) => this.setState({ error, isLoading: false }));
    }


    handleChange(event) {
        this.state[event.target.name] = event.target.value;
        this.forceUpdate();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleChange} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} required />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                {/* {this.state.invalid && <h4>invalid username or possword</h4>} */}

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}

export default withRouter(Login);