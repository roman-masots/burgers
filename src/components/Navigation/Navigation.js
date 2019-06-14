import React from 'react';
import './Navigation.css'

const Navigation = ({ venues }) => {
    return !venues.length ?
        (
            <nav>
                <p className='venuesP'>Venues</p>
                <p>Gathering data...</p>
            </nav>
        )
        :
        (
            <nav>
                <p className='venuesP'>Venues</p>

            </nav>
        )

}

export default Navigation;