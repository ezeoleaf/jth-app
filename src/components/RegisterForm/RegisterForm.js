import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';
import {withRouter} from "react-router-dom"

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Just The Headlines
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function RegisterForm(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    email = "",
    username: "",
    password: "",
    confirmPassword: "",
    successMessage: ""
  });

  const handleChange = (e) => {
    const {id, value} = e.target
    this.setState(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

// class RegisterForm extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             email: "",
//             username: "",
//             password: "",
//             confirmPassword: "",
//             successMessage: null
//         };
//     }

//     // handleClick = event => {
//     // this.setState({anchorEl: event.currentTarget});
//     // };

//     // handleClose = () => {
//     // this.setState({anchorEl: null});
//     // }

//     handleChange = e => {
//         console.log("CHANGE")
//         const {id, value} = e.target
//         this.setState(prevState => ({
//             ...prevState,
//             [id] : value
//         }))
//     }

//     sendDetailsToServer = () => {
//         if (this.state.email.length && this.state.username.length && this.state.password.length) {
//             this.props.showError(null)
//             var myHeaders = new Headers();
//             myHeaders.append("Content-Type", "application/json");

//             var data = new FormData()
//             data.append('email', this.state.email)
//             data.append('username', this.state.username)
//             data.append('password', this.state.password)

//             axios.post(API_BASE_URL+'user', data, myHeaders)
//                 .then(function (response) {
//                     if(response.data.code === 200) {
//                         this.setState(prevState => ({
//                             ...prevState,
//                             'successMessage': "Registration success"
//                         }))
//                         this.redirectToHome()
//                         this.props.showError(null)
//                     } else {
//                         this.props.showError("Some error ocurred")
//                     }
//                 })
//                 .catch(function (error) {
//                     console.log(error);
//                 })

//         } else {
//             this.props.showError('Please enter valid username and password')
//         }
//     }

//     redirectToHome = () => {
//         this.props.updateTitle('Home')
//         this.props.history.push('/home')
//     }

//     handleSubmitClick = (e) => {
//         e.preventDefault()
//         if (this.state.password === this.state.confirmPassword) {
//             this.sendDetailsToServer()
//         } else {
//             this.props.showError('Passwords do not match')
//         }
//     }

//     redirectToLogin = () => {
//         this.props.updateTitle('Login')
//         this.props.history.push('/login')
//     }

//     render() {
//         return (
//             <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
//                 <form>
//                     <div className="form-group text-left">
//                         <label htmlFor="exampleInputEmail1">Email</label>
//                         <input type="email"
//                                className="form-control"
//                                id="email"
//                                aria-describedby="emailHelp"
//                                placeholder="Enter email"
//                                value={this.state.email}
//                                onChange={this.handleChange}
//                         />
//                         <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="exampleInputUsername1">Username</label>
//                         <input type="text"
//                                className="form-control"
//                                id="username"
//                                placeholder="Username"
//                                value={this.state.username}
//                                onChange={this.handleChange}
//                         />
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="exampleInputPassword1">Password</label>
//                         <input type="password" 
//                             className="form-control" 
//                             id="password" 
//                             placeholder="Password"
//                             value={this.state.password}
//                             onChange={this.handleChange}
//                         />
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="exampleInputPassword1">Confirm Password</label>
//                         <input type="password" 
//                             className="form-control" 
//                             id="confirmPassword" 
//                             placeholder="Confirm Password"
//                             value={this.state.confirmPassword}
//                             onChange={this.handleChange}
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="btn btn-primary"
//                         onClick={this.handleSubmitClick}
//                     >Register</button>
//                 </form>
//                 <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none'}} role="alert">
//                     {this.state.successMessage}
//                 </div>
//                 <div className="mt-2">
//                     <span>Already have an account?</span>
//                     <span className="loginText" onClick={() => this.redirectToLogin()}>Login here</span>
//                 </div>
//             </div>
//         )
//     }
// }

export default withRouter(RegisterForm)