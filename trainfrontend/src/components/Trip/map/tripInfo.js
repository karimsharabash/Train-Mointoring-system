import { Map, InfoWindow, Marker, GoogleApiWrapper ,Polyline} from 'google-maps-react';
import React, { Component } from 'react';

import { Link,BrowserRouter } from 'react-router-dom'
import Requests from '../../../authentication/authenticationWithApi';
const mapStyles = {
  width: '100%',
  height: '100%'
};

export class TripInfo extends Component {
  tripId = this.props.match.params.tripId;
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker

    trip: {},
    points :[]
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount() {
    const axios = Requests();
    
    axios.get("http://localhost:5000/trip/"+this.tripId)
      .then((res) => {

        console.log(res);
        this.setState({
          trip: res.data,
          points :res.data.points
        })
      })

  }

  render() {
    const { points } = this.state
    const pointList = points.length ? (
      points.map((point) => {      
        return (<Marker key={point._id}
          position={{ lat: point.location.latitude, lng: point.location.longitude }}
          onClick={this.onMarkerClick}
          name={this.state.trip.trainId}
          source={this.state.trip.source}
          dest={this.state.trip.dest}
          temp={point.motorTemp}
          id={this.state.trip._id}
        />)
      })
    ) : (console.log("there is no points available"))

    const pathCoords = points.map( point => {
      console.log(point)
      return { lat: point.location.latitude, lng:  point.location.longitude }
    });

    console.log(this.state.selectedPlace)
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{ lat: 30, lng: 31 }}
        className={'map'}>
        
        {pointList}
       
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            <p>{"motor temp : " +this.state.selectedPlace.temp}</p>
            <BrowserRouter>
               <Link to={"/trip/"+ this.state.selectedPlace.id} className=" btn-outline-danger btn">Details</Link>
             </BrowserRouter>
            
            
          </div>
        </InfoWindow>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY
})(TripInfo)