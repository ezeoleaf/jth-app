import React, {useState} from 'react'
import axios from 'axios'
import './LoginForm.css'
import {API_BASE_URL} from '../../constants/apiConstants'
import {withRouter} from 'react-router-dom'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            successMessage: null,
            isLoggedIn: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitClick = this.handleSubmitClick.bind(this)
    }

    handleChange = (e) => {
        const {id, value} = e.target
        this.setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    handleSubmitClick = (e) => {
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var data = new FormData()
        data.append('username', this.state.username)
        data.append('password', this.state.password)

        axios.post(API_BASE_URL+'user/login', data, myHeaders )
            .then((response) => {

                if(response.status === 200) {
                    this.setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Login successful',
                    }))
                    localStorage.setItem("token", response.data.token)
                    this.redirectToHome()
                    this.props.showError(null)
                }
                else if(response.status === 204) {
                    this.props.showError('Username and password do not match')
                } else {
                    this.props.showError('Username does not exists')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    redirectToHome = () => {
        this.props.updateTitle('Home')
        this.props.history.push('/home')
    }
    
    redirectToRegister = () => {
        this.props.history.push('/register')
        this.props.updateTitle('Register')
    }

    render() {
        return(
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="inputUsername">Username</label>
                        <input type="text"
                               className="form-control"
                               id="username"
                               aria-describedby="usernameHelp"
                               placeholder="Enter username"
                               value={this.state.username}
                               onChange={this.handleChange}
                        />
                        <small id="usernameHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password"
                               className="form-control"
                               id="password"
                               placeholder="Password"
                               value={this.state.password}
                               onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-check"></div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.handleSubmitClick}
                    >Login</button>
                </form>
                <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
                    {this.state.successMessage}
                </div>
                <div className="registerMessage">
                    <span>Don't have an account? </span>
                    <span className="loginText" onClick={() => this.redirectToRegister()}>Register</span>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginForm)