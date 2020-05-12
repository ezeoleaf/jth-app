import React, {useState} from 'react'
import axios from 'axios'
// import './Newspaper.css'
import {API_BASE_URL} from '../../constants/apiConstants'
import {withRouter} from 'react-router-dom'

class SectionList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedNewspaper: props.newspaperId,
            sections: [],
        }
    }

    // searchSections = (id) => {
    //     this.setState({
    //         searchSections: true,
    //         selectedNewspaper: id,
    //       })
    // }

    render() {
        return (
            <div>
                <br/><h3 onClick={this.props.reset}> Sections </h3><br/>
                {
                this.state.sections &&
                this.state.sections.map( item =>
                    <div className="card my-2" key={item.id}>
                        <div className="card-body py-2">
                            {item.name}
                        </div>
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
        console.log("Bearer " + authToken)

        axios.get(API_BASE_URL + 'newspapers/' + this.state.selectedNewspaper, { headers: { Authorization: token } } )
            .then(response => {
                if(response.status === 200) {
                    console.log(response.data)
                    this.setState({ sections: response.data.sections })
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

}

export default SectionList