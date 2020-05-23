import React from 'react'
import axios from 'axios'
import {API_BASE_URL} from '../../constants/apiConstants'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function NewsList(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    selectedSection: props.sectionId,
    news: [],
  })

  const getNews = () => {
    const authToken = localStorage.getItem("token")
    const token = 'Bearer '.concat(authToken);

    axios.get(API_BASE_URL + 'news/' + state.selectedSection, { headers: { Authorization: token } } )
      .then(response => {
          if(response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              news: response.data
            }))
          }
      })
      .catch((error) => {
          console.log(error)
      })
  }

  React.useEffect(() => {
    if (state.news.length == 0) {
      getNews()
    }
  }, []);

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="news">
        <ListItem button onClick={props.reset}>
          <ListItemText style={{ textAlign: 'center' }} primary="Return" />
          <ListItemSecondaryAction></ListItemSecondaryAction>
        </ListItem>
        <Divider />
        { state.news ?
          state.news.map( (item, ix) =>
            <ListItem button key={ix} >
              <ListItemText style={{ textAlign: 'center' }} primary={item.title} secondary={item.description} />
            </ListItem>
            
          )
        :
        <List component="nav" aria-label="news">
          <ListItem>
            <ListItemText style={{ textAlign: 'center' }} primary="No news available" />
          </ListItem>
        </List>
        }
      </List>
    </div>
  );
}

export default NewsList