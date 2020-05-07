import React, {useState} from 'react'
import axios from 'axios'
// import './Newspaper.css'
import {API_BASE_URL} from '../../constants/apiConstants'
import {withRouter} from 'react-router-dom'

class Newspaper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            newspapers: [],
            selectedNewspaper: null,
            filteredNewspapers: [],
            search: ""
        }
    }

    render() {
        return (
            <div>
                {
                this.state.newspapers &&
                this.state.newspapers.map( item =>
                    <div className="card my-4" key={item.id}>
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
        console.log(this.state)
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