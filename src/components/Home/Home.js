import React, {useState, Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import HomeNews from '../News/HomeNews'

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
                <HomeNews />
            </div>
        </div>
    )
}

export default withRouter(Home)