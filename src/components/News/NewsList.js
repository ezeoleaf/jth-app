import React, {useState} from 'react'
import axios from 'axios'
import {API_BASE_URL} from '../../constants/apiConstants'
import {withRouter} from 'react-router-dom'

class NewsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedSection: props.sectionId,
            news: [],
        }
    }

    render() {
        return (
            <div>
                <br/><h3 onClick={this.props.reset}> News </h3><br/>
                <div className="list-group">
                {
                this.state.news &&
                this.state.news.map( (item, ix) =>
                    <div className="list-group-item list-group-item-action flex-column align-items-start" key={ix}>
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{item.title}</h5>
                        <small>{item.newspaper}</small>
                        </div>
                        <p className="mb-1">{item.description}</p>
                    </div>
                )}
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        this.getNews()
    }

    getNews = () => {
        const authToken = localStorage.getItem("token")

        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("Authorization", "bearer " + authToken)
        const token = 'Bearer '.concat(authToken);

        axios.get(API_BASE_URL + 'news/' + this.state.selectedSection, { headers: { Authorization: token } } )
            .then(response => {
                if(response.status === 200) {
                    this.setState({ news: response.data })
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

}

export default NewsList