import React from 'react';
import './Navigation.css'

class Navigation extends React.Component {
    loading = (e) => {
        if (this.props.venues.length) {
            document.getElementById('loadingP').style.display = 'none';
        }
    }
    render() {
        return (
            <nav>
                <p className='venuesP'>Venues</p>
                <p id='loadingP' onLoad={this.loading(this)}>Gathering data...</p>
            </nav>
        )
    }
}

export default Navigation;