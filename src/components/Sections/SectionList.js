import React from 'react';
import axios from 'axios'
import {API_BASE_URL} from '../../constants/apiConstants'
import NewsList from '../News/NewsList'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function SectionList(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    selectedNewspaper: props.newspaperId,
    sections: {},
    selectedSection: null,
    searchNews: false,
    filteredSections: [],
    search: ""
  })

  const searchNews = (id) => {
    setState((prevState) => ({
      ...prevState,  
      searchNews: true,
      selectedSection: id,
    }))
  }

  const handleToggle = (value, sectionId) => () => {
    let section = state.sections[state.selectedNewspaper][value]
    let subscribed = section.subscribed ? false : true
    section.subscribed = subscribed
    let endpoint = subscribed ? "subscribe" : "unsubscribe"

    const authToken = localStorage.getItem("token")
    const token = 'Bearer '.concat(authToken);

    console.log(sectionId)
    console.log(section.id)
    var data = new FormData()
    data.append('sectionID', section.id)

    axios.post(API_BASE_URL+endpoint, data, { headers: { Authorization: token } })
      .then((response) => {
          if(response.status === 200) {
            setState((prevState) => ({
              ...prevState,  
              sections: state.sections,
            }))
          } else {
            console.log(response)
          }
      })
      .catch((error) => {
          console.log(error);
      })
  };

  const resetSections = () => {
    setState((prevState) => ({
      ...prevState,  
      searchNews: false,
      selectedSection: null,
    }))
  }

  const getSections = () => {
    const authToken = localStorage.getItem("token")
    const token = 'Bearer '.concat(authToken);
    axios.get(API_BASE_URL + 'newspapers/' + state.selectedNewspaper, { headers: { Authorization: token } } )
      .then(response => {
          if(response.status === 200) {
            let sections = state.sections
            sections[state.selectedNewspaper] = response.data.sections
            setState((prevState) => ({
              ...prevState,
              sections: sections
            }))
          }
      })
      .catch((error) => {
          console.log(error)
      })
  }

  React.useEffect(() => {
    if (!state.sections[state.selectedNewspaper]) {
      getSections()
    }
  }, []);

  return (
    <div className={classes.root}>
      { !state.selectedSection ?
      <List component="nav" aria-label="sections">
        <ListItem button onClick={props.reset} key="return">
          <ListItemText style={{ textAlign: 'center' }} primary="Return" />
          <ListItemSecondaryAction></ListItemSecondaryAction>
        </ListItem>
        <Divider />
        { state.sections[state.selectedNewspaper] &&
          state.sections[state.selectedNewspaper].map( (item, ix) =>
          <ListItem button key={ix} onClick={() => searchNews(item.id)} >
            <ListItemText style={{ textAlign: 'center' }} primary={item.name} secondary={item.description} />
            <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle(ix, item.id)}
              checked={item.subscribed}
              inputProps={{ 'aria-labelledby': 'switch-list-label-follow' }}
            />
            </ListItemSecondaryAction>
          </ListItem>
          
        )}
      </List>
      :
        <NewsList sectionId={state.selectedSection} reset={resetSections} />
      }
    </div>
  );
}

export default SectionList