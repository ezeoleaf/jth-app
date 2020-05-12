import React, {useState, Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import NewspaperList from '../Newspaper/Newspaper'

function Home(props) {

    const redirectToLogin = () => {
        props.history.push('/login')
    }

    const authToken = localStorage.getItem("token")
    if (!authToken) {
        redirectToLogin()
    }

    return(
        <div className="row">
            <div className="mt-2">
                <NewspaperList />
            </div>
        </div>
    )
}

export default withRouter(Home)