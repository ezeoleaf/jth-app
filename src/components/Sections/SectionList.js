import React, {useState} from 'react'
import axios from 'axios'
// import './Newspaper.css'
import {API_BASE_URL} from '../../constants/apiConstants'
import {withRouter} from 'react-router-dom'
import NewsList from '../News/NewsList'

class SectionList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedNewspaper: props.newspaperId,
            sections: [],
            selectedSection: null,
            searchNews: false
        }

        this.searchNews = this.searchNews.bind(this)
        this.resetNews = this.resetNews.bind(this)
    }

    searchNews = (id) => {
        this.setState(() => {
            return {
                searchNews: true,
                selectedSection: id,
            }
          })
    }

    resetNews = () => {
        this.setState(() => {
            return {
                searchNews: false,
                selectedSection: null
            }
        })
    }

    render() {
        return (
            <div>
                <br/><h3 onClick={this.props.reset}> Sections </h3><br/>
                { this.state.searchNews ?
                <NewsList sectionId={this.state.selectedSection} reset={this.resetNews} />
                :
                this.state.sections &&
                this.state.sections.map( item =>
                    <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.searchNews(item.id)} key={item.id}>
                        <div className="d-flex w-100 justify-content-between">
                        <h6 className="my-2">{item.name}&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                        <small><a href="#" className="button">Follow</a></small>
                        </div>
                        <p className="mb-1">{item.description}</p>
                    </div>
                )}
            </div>
        )
    }

    componentDidMount = () => {
        this.getSections()
    }

    getSections = () => {
        const authToken = localStorage.getItem("token")

        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("Authorization", "bearer " + authToken)
        const token = 'Bearer '.concat(authToken);

        axios.get(API_BASE_URL + 'newspapers/' + this.state.selectedNewspaper, { headers: { Authorization: token } } )
            .then(response => {
                if(response.status === 200) {
                    this.setState({ sections: response.data.sections })
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

}

export default SectionList