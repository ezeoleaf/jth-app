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

    componentDidMount() {
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
            .then(function (response) {
                if(response.status === 200) {
                    this.setState(prevState => ({
                        ...prevState,
                        newspapers : response.data.items
                    }))
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        console.log("Retrieve newspapers")
    }

    render() {
        return (
            <div className="card">
                A
            </div>
        )
    }

}

export default Newspaper