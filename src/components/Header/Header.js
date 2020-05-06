import React from 'react';
import { withRouter } from 'react-router-dom';

function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    const title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="row col-12">
                <div className="col-4 d-flex justify-content-left text-white">
                    <span className="h3">JTH</span>
                </div>
                <div className="col-8 d-flex flex-row-reverse text-white">
                    <div className="p-2">Login</div>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Header);