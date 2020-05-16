import React, {useState} from 'react'
import axios from 'axios'
import {API_BASE_URL} from '../../constants/apiConstants'
import {withRouter} from 'react-router-dom'

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    username: "",
    password: "",
    successMessage: ""
  });

  const handleChange = (e) => {
    const {id, value} = e.target
    console.log(id, value)
    setState(prevState => ({
        ...prevState,
        [id]: value
    }))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault()

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var data = new FormData()
    data.append('username', state.username)
    data.append('password', state.password)

    axios.post(API_BASE_URL+'user/login', data, myHeaders )
      .then((response) => {

          if(response.status === 200) {
              setState(prevState => ({
                  ...prevState,
                  'successMessage': 'Login successful',
              }))
              localStorage.setItem("token", response.data.token)
              redirectToHome()
              // this.props.showError(null)
          }
          else if(response.status === 204) {
            console.log(response)
              // this.props.showError('Username and password do not match')
          } else {
            console.log(response)
              // this.props.showError('Username does not exists')
          }
      })
      .catch((error) => {
          console.log(error)
      })
  }

  const redirectToHome = () => {
    props.history.push('/home')
  }

  const redirectToRegister = () => {
    props.history.push('/register')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={state.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={state.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitClick}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={redirectToRegister}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignIn)