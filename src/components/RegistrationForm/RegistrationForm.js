import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css'
import {API_BASE_URL} from '../../constants/apiConstants';
import {withRouter} from "react-router-dom"

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            successMessage: null
        };
    }

    // handleClick = event => {
    // this.setState({anchorEl: event.currentTarget});
    // };

    // handleClose = () => {
    // this.setState({anchorEl: null});
    // }

    handleChange = e => {
        console.log("CHANGE")
        const {id, value} = e.target
        this.setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    sendDetailsToServer = () => {
        if (this.state.email.length && this.state.username.length && this.state.password.length) {
            this.props.showError(null)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var data = new FormData()
            data.append('email', this.state.email)
            data.append('username', this.state.username)
            data.append('password', this.state.password)

            axios.post(API_BASE_URL+'user', data, myHeaders)
                .then(function (response) {
                    if(response.data.code === 200) {
                        this.setState(prevState => ({
                            ...prevState,
                            'successMessage': "Registration success"
                        }))
                        this.redirectToHome()
                        this.props.showError(null)
                    } else {
                        this.props.showError("Some error ocurred")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })

        } else {
            this.props.showError('Please enter valid username and password')
        }
    }

    redirectToHome = () => {
        this.props.updateTitle('Home')
        this.props.history.push('/home')
    }

    handleSubmitClick = (e) => {
        e.preventDefault()
        if (this.state.password === this.state.confirmPassword) {
            this.sendDetailsToServer()
        } else {
            this.props.showError('Passwords do not match')
        }
    }

    redirectToLogin = () => {
        this.props.updateTitle('Login')
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email"
                               className="form-control"
                               id="email"
                               aria-describedby="emailHelp"
                               placeholder="Enter email"
                               value={this.state.email}
                               onChange={this.handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputUsername1">Username</label>
                        <input type="text"
                               className="form-control"
                               id="username"
                               placeholder="Username"
                               value={this.state.username}
                               onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.handleSubmitClick}
                    >Register</button>
                </form>
                <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none'}} role="alert">
                    {this.state.successMessage}
                </div>
                <div className="mt-2">
                    <span>Already have an account?</span>
                    <span className="loginText" onClick={() => this.redirectToLogin()}>Login here</span>
                </div>
            </div>
        )
    }
}

export default withRouter(RegistrationForm)