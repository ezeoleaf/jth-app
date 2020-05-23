// import React, {useState} from 'react'
import axios from 'axios'
// import './Newspaper.css'
import {API_BASE_URL} from '../../constants/apiConstants'
import {withRouter} from 'react-router-dom'
import NewsList from '../News/NewsList'

// class SectionList extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             selectedNewspaper: props.newspaperId,
//             sections: [],
//             selectedSection: null,
//             searchNews: false
//         }

//         this.searchNews = this.searchNews.bind(this)
//         this.resetNews = this.resetNews.bind(this)
//     }

//     searchNews = (id) => {
//         this.setState(() => {
//             return {
//                 searchNews: true,
//                 selectedSection: id,
//             }
//           })
//     }

//     resetNews = () => {
//         this.setState(() => {
//             return {
//                 searchNews: false,
//                 selectedSection: null
//             }
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <br/><h3 onClick={this.props.reset}> Sections </h3><br/>
//                 { this.state.searchNews ?
//                 <NewsList sectionId={this.state.selectedSection} reset={this.resetNews} />
//                 :
//                 this.state.sections &&
//                 this.state.sections.map( item =>
//                     <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.searchNews(item.id)} key={item.id}>
//                         <div className="d-flex w-100 justify-content-between">
//                         <h6 className="my-2">{item.name}&nbsp;&nbsp;&nbsp;&nbsp;</h6>
//                         <small><a href="#" className="button">Follow</a></small>
//                         </div>
//                         <p className="mb-1">{item.description}</p>
//                     </div>
//                 )}
//             </div>
//         )
//     }

//     componentDidMount = () => {
//         this.getSections()
//     }

//     getSections = () => {
//         const authToken = localStorage.getItem("token")

//         var myHeaders = new Headers()
//         myHeaders.append("Content-Type", "application/json")
//         myHeaders.append("Authorization", "bearer " + authToken)
//         const token = 'Bearer '.concat(authToken);

//         axios.get(API_BASE_URL + 'newspapers/' + this.state.selectedNewspaper, { headers: { Authorization: token } } )
//             .then(response => {
//                 if(response.status === 200) {
//                     this.setState({ sections: response.data.sections })
//                 }
//             })
//             .catch(function (error) {
//                 console.log(error)
//             })
//     }

// }

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
    sections: [],
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

  const handleToggle = (value) => () => {
    let section = state.sections[value]
    let subscribed = section.subscribed ? false : true
    section.subscribed = subscribed
    let endpoint = subscribed ? "subscribe" : "unsubscribe"

    const authToken = localStorage.getItem("token")
    const token = 'Bearer '.concat(authToken);

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

    axios.get(API_BASE_URL + 'newspapers/' + props.newspaperId, { headers: { Authorization: token } } )
      .then(response => {
          if(response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              sections: response.data.sections
            }))
          }
      })
      .catch((error) => {
          console.log(error)
      })
  }

  React.useEffect(() => {
    if (state.sections.length == 0) {
      getSections()
    }
  }, []);

  return (
    <div className={classes.root}>
      { !state.selectedSection ?
      <List component="nav" aria-label="sections">
        { state.sections.map( (item, ix) =>
          <ListItem button key={item.id} onClick={() => searchNews(item.id)} >
            <ListItemText style={{ textAlign: 'center' }} primary={item.name} secondary={item.description} />
            <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggle(ix)}
              checked={item.subscribed}
              inputProps={{ 'aria-labelledby': 'switch-list-label-follow' }}
            />
            </ListItemSecondaryAction>
          </ListItem>
          
        )}
      </List>
      :
        "a"
        // <SectionList newspaperId={state.selectedNewspaper} reset={resetSections} />
      }
      {/* <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Spam" />
        </ListItemLink>
      </List> */}
    </div>
  );
}

export default SectionList