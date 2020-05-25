import React from 'react'
import axios from 'axios'
import {API_BASE_URL} from '../../constants/apiConstants'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: '100%',
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

function HomeNews(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    news: [],
  })

  const getNews = () => {
    const authToken = localStorage.getItem("token")
    const token = 'Bearer '.concat(authToken);

    axios.get(API_BASE_URL + 'news', { headers: { Authorization: token } } )
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
    <div >
			{ state.news ?
				state.news.map( (item, ix) =>
					<Card className={classes.root} variant="outlined" key={ix}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
									{item.newspaper} - {item.section}
							</Typography>
							<Typography variant="h5" component="h2">
									{item.title}
							</Typography>
							<Typography variant="body2" component="p">
									{item.description}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">Read more</Button>
						</CardActions>
					</Card>
					)
					:
					"HOLA"
			}
    </div>
    // <div className={classes.root}>
        
    //   <List component="nav" aria-label="news">
    //     { state.news ?
    //       state.news.map( (item, ix) =>
    //         <ListItem button key={ix} >
    //           <ListItemText style={{ textAlign: 'center' }} primary={item.title} secondary={item.description} />
    //         </ListItem>
            
    //       )
    //     :
    //     <List component="nav" aria-label="news">
    //       <ListItem>
    //         <ListItemText style={{ textAlign: 'center' }} primary="No news available" />
    //       </ListItem>
    //     </List>
    //     }
    //   </List>
    // </div>
  );
}

export default HomeNews