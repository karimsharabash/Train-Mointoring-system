import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import Request from "../../../authentication/authenticationWithApi"
import { Link,BrowserRouter } from 'react-router-dom'
const mapStyles = {
  width: '100%',
  height: '100%'
};

export class Trips extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker

    trips: []
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
    let axios=Request();
    axios.get("http://localhost:5000/trip/lastPoint")
      .then((res) => {

        console.log(res);
        this.setState({
          trips: res.data
        })
      })

  }

  render() {
    const { trips } = this.state
    const tripList = trips.length ? (
      trips.map((trip) => {      
        return (<Marker key={trip._id}
          position={{ lat: trip.points[0].location.latitude, lng: trip.points[0].location.longitude }}
          onClick={this.onMarkerClick}
          name={trip.trainId}
          source={trip.source}
          dest={trip.dest}
          id={trip._id}
        />)
      })
    ) : (console.log("there is no trips available"))

    console.log(this.state.selectedPlace)
    return (
      <Map
        google={this.props.google}
        zoom={7}
        style={mapStyles}
        initialCenter={{ lat: 28, lng: 31 }}
        className={'map'}>
        {tripList}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            <p>{"from " +this.state.selectedPlace.source+" to "+ this.state.selectedPlace.dest }</p>
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
})(Trips)