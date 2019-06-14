import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Map from './components/Map/Map';
import CardList from './components/CardList/CardList';
import Scroll from './components/Scroll/Scroll';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      position: {
        lat: 58.3780,
        lng: 26.732
      },
      circle: {
        radius1: 1000,
        radius2: 20
      },
      venues: [],
      markers: []
    };
  }

  async loadVenues(map) {
    const venuesEndpoint = `https://api.foursquare.com/v2/venues/explore?`;
    const venuesPictures = `https://api.foursquare.com/v2/venues/`

    const photoSize = '300x300'; // Venue photo size
    const venueDistance = 1000; // Distance in meters from where to start looking for venues

    const venuesParams = {
      client_id: 'FOURSQUARE_client_id_key',
      client_secret: 'FOURSQUARE_client_secret_key',
      radius: 5000, // The search radius from our position
      limit: 50, // The max number of venues to load
      query: 'burgers', // The type of venues we want to query
      v: '20190606', // The version of the API.
      ll: `${this.state.position.lat},${this.state.position.lng}` // The latitude and longitude
    };

    await fetch(venuesEndpoint + new URLSearchParams(venuesParams), {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        response.response.groups[0].items.forEach(v => {
          // If distance is over 1000m from our position, then get venue last photo and update venues state
          if (v.venue.location.distance > venueDistance) {
            fetch(`${venuesPictures}${v.venue.id}/photos?client_id=${venuesParams.client_id}&client_secret=${venuesParams.client_secret}&v=${venuesParams.v}`, {
              method: 'GET'
            })
              .then(response => response.json())
              .then(response => {
                (response.response.photos.items.length > 0)
                  ?
                  //  Photo with index 0 is always the newest one
                  v.venuePhoto = `${response.response.photos.items[0].prefix}${photoSize}${response.response.photos.items[0].suffix}`
                  :
                  v.venuePhoto = null;

                // Updateing venues state with new venue
                this.setState(prevState => ({
                  venues: [...prevState.venues, v]
                }))
              })

            // Google Markers:
            var marker = new window.google.maps.Marker({
              position: { lat: v.venue.location.lat, lng: v.venue.location.lng },
              map: map,
              animation: window.google.maps.Animation.DROP
            });

            var infoWindow = new window.google.maps.InfoWindow({
              content: v.venue.name
            });

            // On marker click
            window.google.maps.event.addListener(marker, 'click', () => {
              if (!marker.open) {
                infoWindow.open(map, marker);
                marker.open = true;
              }
              else {
                infoWindow.close();
                marker.open = false;
              }

            });

            // On map click
            window.google.maps.event.addListener(map, 'click', () => {
              infoWindow.close();
              marker.open = false;
            });
          }
        })
      })
  }

  /* getCard = (cardElement) => {
    const map = document.getElementById('myMap');
    const venueById = this.state.venues.filter(venue => venue.venue.id === cardElement.getAttribute('id'))
    console.log('venue by card element id:', venueById[0]);
    console.log('selected card element:', cardElement);


    window.google.maps.event.addDomListener(cardElement, 'click', () => {
      console.log('venueById', venueById);
      console.log('click', cardElement);
    });

    // Google Markers:
    var marker = new window.google.maps.Marker({
      position: { lat: venueById[0].venue.location.lat, lng: venueById[0].venue.location.lng },
      map: map,
      animation: window.google.maps.Animation.DROP
    });

    var infoWindow = new window.google.maps.InfoWindow({
      content: venueById[0].venue.name
    });

    // On marker click
    window.google.maps.event.addListener(marker, 'click', () => {
      if (!marker.open) {
        infoWindow.open(map, marker);
        marker.open = true;
      }
      else {
        infoWindow.close();
        marker.open = false;
      }
      console.log(marker);

    });

    // On map click
    window.google.maps.event.addListener(map, 'click', () => {
      infoWindow.close();
      marker.open = false;
    });
  } */

  render() {
    const { position, circle, venues } = this.state;
    return (
      <div id='mainContainer'>
        <Navigation venues={venues} />
        <Map
          id="myMap"
          options={{
            center: { lat: position.lat, lng: position.lng },
            zoom: 13
          }}
          onMapLoad={map => {
            this.loadVenues(map);
            new window.google.maps.Circle({
              strokeColor: '#0000ff',
              strokeOpacity: 0.4,
              strokeWeight: 1.5,
              fillColor: '#0000ff',
              fillOpacity: 0.1,
              map: map,
              center: { lat: position.lat, lng: position.lng },
              radius: circle.radius1
            });
            new window.google.maps.Circle({
              strokeColor: '#0000ff',
              strokeOpacity: 0.7,
              strokeWeight: 1.5,
              fillColor: '#0000ff',
              fillOpacity: 0.7,
              map: map,
              center: { lat: position.lat, lng: position.lng },
              radius: circle.radius2
            });

          }}
        />
        <Scroll >
          <CardList venues={venues} getCard={this.getCard} />
        </Scroll>
      </div>
    );
  }
}

export default App;
