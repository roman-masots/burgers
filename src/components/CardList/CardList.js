import React from 'react';
import Card from '../Card/Card';
import './CardList.css';

const CardList = ({ venues, getCard }) => {
    return (
        <div id='cardList' className='cardList'>
            {
                venues.map((venue, i) => {
                    return (
                        <Card
                            key={venues[i].venue.id}
                            id={venues[i].venue.id}
                            name={venues[i].venue.name}
                            photo={venues[i].venuePhoto}
                            getCard={getCard}
                        />
                    );
                })
            }
        </div>
    );
};

export default CardList;
