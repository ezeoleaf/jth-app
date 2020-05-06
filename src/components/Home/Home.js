import React, {useState, Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

function Home(props) {

    const redirectToLogin = () => {
        props.history.push('/login')
    }

    const authToken = localStorage.getItem("token")
    if (!authToken) {
        redirectToLogin()
    }

    return(
        <div className="mt-2">
            JTH Home
        </div>
    )
}

export default withRouter(Home)