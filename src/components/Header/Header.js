import React from 'react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    redirectToLogin = () => {
        this.props.history.push("/login")
    }
    redirectToHome = () => {
        this.props.history.push("/home")
    }
    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    render() {
        console.log(this.props)

        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="row col-12">
                    <div className="col-4 d-flex justify-content-left text-white">
                        <span className="h3">JTH</span>
                    </div>
                    <div className="col-8 d-flex flex-row-reverse text-white">
                        <div className="p-2" onClick={() => this.redirectToLogin()}>Login</div>
                    <div className="p-2" onClick={() => this.redirectToHome()}>Newspapers</div>
                    </div>
                </div>
            </nav>
        )
    }
}


export default withRouter(Header);