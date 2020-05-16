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
    <Router>
      <div className={classes.root}>
        <Header auth={authToken} />
        { authToken ?
          <Switch>
            <Route path="/" exact={true}>
                <Home />
            </Route>
            <Route path="/home" exact={true}>
                <Home />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
          </Switch>
        :
          <Redirect  to="/login" />
        }
      </div>
      </Router>
  );
  // return (
  //   <React.Fragment>
  //     <CssBaseline />
  //     <Container fixed>
  //       <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
  //     </Container>
  //   </React.Fragment>
  // );
  // return (
    
  //   <Button variant="contained" color="secondary">
  //     Hello Worldasfasfnals
  //   </Button>
  // );
}


// function App() {
//   const [title, updateTitle] = useState(null)
//   const [errorMessage, updateErrorMessage] = useState(null)
//   return (
//     <Router>
//       <div className="App">
//         <Header title={title} />
//           <div className="container d-flex align-items-center flex-column">
//             <Switch>
//               <Route path="/" exact={true}>
//                 <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
//               </Route>
//               <Route path="/register">
//                 <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
//               </Route>
//               <Route path="/login">
//                 <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} />
//               </Route>
//               <Route path="/home">
//                 <Home/>
//               </Route>
//             </Switch>
//             <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
//           </div>
//       </div>
//     </Router>
//   );
// }

export default App;
