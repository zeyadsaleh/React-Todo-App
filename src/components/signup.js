import React, { Component } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            gender: "",
            isLoading: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const url = "http://todoapp.ahmedrohym.com/api.php?apicall=signup";
        const data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            gender: this.state.gender,
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
                this.setState({
                    responseObject: data,
                    isLoading: false,
                });
            })
            .catch((error) => this.setState({ error, isLoading: false }));


    }


    handleChange(event) {
        // this.setState = ({
        //     [event.target.name]: event.target.value,
        // });
        this.state[event.target.name] = event.target.value;
        this.forceUpdate();

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleChange} required />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} required />
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <input type="text" name="gender" className="form-control" placeholder="Enter gender" value={this.state.gender} onChange={this.handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to="/sign-in">login?</Link>
                </p>
            </form>
        );
    }
}

export default withRouter(SignUp);