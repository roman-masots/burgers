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
        this.setState({ modal: !this.state.modal })
    }

    render() {
        const { photo, name, id } = this.props;
        const photoSrc = (photo !== null) ? photo : no_image;
        return (
            <div className='col-m-6 col-t-4 col-3' id={id}>
                <div className='card'>
                    <img alt="venue" src={photoSrc} className='venuePhoto' key={id} alt={name} onClick={this.showModal} />
                    {
                        this.state.modal === true
                            ?
                            <div className='modal' onClick={this.showModal}>
                                <div className='modal-content'>{name}</div>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        )
    }
};

export default Card;