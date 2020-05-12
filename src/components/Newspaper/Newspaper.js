import React, {useState} from 'react'
import axios from 'axios'
// import './Newspaper.css'
import {API_BASE_URL} from '../../constants/apiConstants'
import {withRouter} from 'react-router-dom'
import SectionList from '../Sections/SectionList'

class Newspaper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            newspapers: [],
            selectedNewspaper: null,
            filteredNewspapers: [],
            sections: [],
            searchSections: false,
            search: ""
        }

        this.resetSections = this.resetSections.bind(this);
        this.searchSections = this.searchSections.bind(this);
    }

    searchSections = (id) => {
        this.setState({
            searchSections: true,
            selectedNewspaper: id,
          })
    }

    resetSections = () => {
        this.setState({
            searchSections: false,
            selectedNewspaper: null
        })
    }

    render() {
        const renderSections = this.state.searchSections;
        return (
            <div>
                { this.state.searchSections ?
                <SectionList newspaperId={this.state.selectedNewspaper} reset={this.resetSections} />
                :
                this.state.newspapers &&
                this.state.newspapers.map( item =>
                    <div className="card my-4" onClick={() => this.searchSections(item.id)} key={item.id}>
                        <div className="card-body">
                            {item.name} - {item.country}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    componentDidMount = () => {
        this.getNewspapers()
    }

    getNewspapers = () => {
        const authToken = localStorage.getItem("token")

        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("Authorization", "bearer " + authToken)
        const token = 'Bearer '.concat(authToken);
        console.log("Bearer " + authToken)

        axios.get(API_BASE_URL + 'newspapers', { headers: { Authorization: token } } )
            .then(response => {
                if(response.status === 200) {
                    console.log(response.data)
                    this.setState({ newspapers: response.data.items })
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        console.log("Retrieve newspapers")
    }

}

export default Newspaper