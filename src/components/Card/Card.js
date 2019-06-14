import React from 'react';
import no_image from './no_image.jpg';
import './Card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    showModal = () => {
        this.state.modal === false ? this.setState({ modal: true }) : this.setState({ modal: false });
    }

    /*     onCardLoad = () => {
            const cardElement = document.getElementById(`${this.props.id}`)
            cardElement.venueId = this.props.id;
            cardElement.venueName = this.props.name;
            this.props.getCard(cardElement);
        } */

    render() {
        const { photo, name, id } = this.props;
        return (photo !== null) ?
            (
                <div className='col-m-6 col-t-4 col-3' id={id}>
                    {this.state.modal === false
                        ?
                        <div className='card'>
                            <img alt="venue" src={photo} className='venuePhoto' key={id} alt={name} /*onLoad={this.onCardLoad}*/ onClick={this.showModal} />
                        </div>
                        :
                        <div className='card'>
                            <img alt="venue" src={photo} className='venuePhoto' key={id} alt={name} /*onLoad={this.onCardLoad}*/ onClick={this.showModal} />
                            <div className='modal' onClick={this.showModal}>
                                <div className='modal-content'>{name}</div>
                            </div>
                        </div>
                    }
                </div>
            )
            :
            (
                <div className='col-m-6 col-t-4 col-3' id={id}>
                    {this.state.modal === false
                        ?
                        <div className='card'>
                            <img alt="venue" src={no_image} className='venuePhoto' key={id} alt={name} /*onLoad={this.onCardLoad}*/ onClick={this.showModal} />
                        </div>
                        :
                        <div className='card'>
                            <img alt="venue" src={no_image} className='venuePhoto' key={id} alt={name} /*onLoad={this.onCardLoad}*/ onClick={this.showModal} />
                            <div className='modal' onClick={this.showModal}>
                                <div className='modal-content'>{name}</div>
                            </div>
                        </div>
                    }
                </div>
            )
    }
};

export default Card;
