import axios from 'axios'
// import './Newspaper.css'
import {API_BASE_URL} from '../../constants/apiConstants'
import {withRouter} from 'react-router-dom'
import SectionList from '../Sections/SectionList'

// class Newspaper extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             newspapers: [],
//             selectedNewspaper: null,
//             filteredNewspapers: [],
//             sections: [],
//             searchSections: false,
//             search: ""
//         }

//         this.resetSections = this.resetSections.bind(this);
//         this.searchSections = this.searchSections.bind(this);
//     }

//     searchSections = (id) => {
//         this.setState({
//             searchSections: true,
//             selectedNewspaper: id,
//           })
//     }

//     resetSections = () => {
//         this.setState({
//             searchSections: false,
//             selectedNewspaper: null
//         })
//     }

//     render() {
//         const renderSections = this.state.searchSections;
//         return (
//             <div>
//                 { this.state.searchSections ?
//                 <SectionList newspaperId={this.state.selectedNewspaper} reset={this.resetSections} />
//                 :
//                 this.state.newspapers &&
//                 this.state.newspapers.map( item =>
//                     <div className="card my-4" onClick={() => this.searchSections(item.id)} key={item.id}>
//                         <div className="card-body">
//                             {item.name} - {item.country}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         )
//     }

//     componentDidMount = () => {
//         this.getNewspapers()
//     }

//     getNewspapers = () => {
//         const authToken = localStorage.getItem("token")

//         var myHeaders = new Headers()
//         myHeaders.append("Content-Type", "application/json")
//         myHeaders.append("Authorization", "bearer " + authToken)
//         const token = 'Bearer '.concat(authToken);
//         console.log("Bearer " + authToken)

//         axios.get(API_BASE_URL + 'newspapers', { headers: { Authorization: token } } )
//             .then(response => {
//                 if(response.status === 200) {
//                     console.log(response.data)
//                     this.setState({ newspapers: response.data.items })
//                 }
//             })
//             .catch(function (error) {
//                 console.log(error)
//             })

//         console.log("Retrieve newspapers")
//     }
// }

// export default Newspaper

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from '@material-ui/core/Typography';

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

function NewspaperList(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    newspapers: [],
    selectedNewspaper: null,
    filteredNewspapers: [],
    sections: [],
    searchSections: false,
    search: ""
  })

  const searchSections = (id) => {
    setState( (prevState) => ({
        ...prevState,
        searchSections: true,
        selectedNewspaper: id,
    }))
  }

  const resetNewspapers = () => {
    setState( (prevState) => ({
      ...prevState,
      searchSections: false,
      selectedNewspaper: null,
    }))
  }

  const getNewspapers = () => {
    const authToken = localStorage.getItem("token")

    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", "bearer " + authToken)
    const token = 'Bearer '.concat(authToken);

    axios.get(API_BASE_URL + 'newspapers', { headers: { Authorization: token } } )
        .then((response) => {
            if(response.status === 200) {
              console.log(response);
                setState(prevState => ({
                  ...prevState,
                  newspapers: response.data.items }))
            }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem("token")
            redirectToLogin()
          }
        })

    console.log("Retrieve newspapers")
  }

  const redirectToLogin = () => {
    props.history.push('/login')
  }

  React.useEffect(() => {
    if (state.newspapers.length == 0) {
      getNewspapers()
    }
  }, []);

  return (
    <div className="row">
      <div className="mt-2">        
        <div className={classes.root}>
          { !state.selectedNewspaper ?
          <List component="nav" aria-label="main mailbox folders">
            { state.newspapers.map( item =>
              <ListItem button key={item.id} onClick={() => searchSections(item.id)} >
                <ListItemText style={{ textAlign: 'center' }} primary={item.name} secondary={item.country} />
              </ListItem>
              
            )}
          </List>
          :
            <SectionList newspaperId={state.selectedNewspaper} reset={resetNewspapers} />
          }
        </div>
      </div>
    </div>
  );
}

export default withRouter(NewspaperList)