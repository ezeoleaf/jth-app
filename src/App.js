import React, {useState} from 'react'
import './App.css'
import Header from './components/Header/Header'
import LoginForm from './components/LoginForm/LoginForm'
import RegisterForm from './components/RegisterForm/RegisterForm'
import Home from './components/Home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import AlertComponent from './components/AlertComponent/AlertComponent'

import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Newspaper from './components/Newspaper/Newspaper'

const useStyles = makeStyles((theme) => (
  console.log(theme),
  {
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

function App(props) {
  const classes = useStyles();

  const authToken = localStorage.getItem("token")

  const redirectToLogin = () => {
    //history.push('/login')
    if (props.history) {

    } else {
      props.push({history: "/login"})
    }
    console.log(props)
  }

  return (
    <Router forceRefresh={true}>
      <div className={classes.root}>
        <Header auth={authToken} />
        { authToken ?
          <Switch>
            <Route path="/" exact={true}>
                <Home />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/newspapers">
                <Newspaper />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
          </Switch>
        :
          <Switch>
            <Route path="/" exact={true}>
              <LoginForm />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
          </Switch>
        }
      </div>
    </Router>
  );
}

export default App;
