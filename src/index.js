import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import getMuiTheme from '@material-ui/styles/getMuiTheme';
// import {MuiThemeProvider, getMuiTheme} from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { green, orange, blue, blueGrey } from '@material-ui/core/colors';

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[800],
    },
    secondary: {
      main: orange[500],
    },
  },
});

ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={outerTheme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
  document.querySelector("#app")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
