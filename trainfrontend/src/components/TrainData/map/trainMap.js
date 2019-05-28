// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
// class TrainMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 30.8020 ,
//       lng: 30.8343 
//     },
//     zoom: 7
//   };
 
//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div  style={{ height: '60vh', width: '100%'}}>
//         <GoogleMapReact 
//        bootstrapURLKeys={{ key:  process.env.mapKey}}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent
//             lat={30.955413}
//             lng={30.337844}
//             text="My Marker"
//           />
          
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }
 
// export default TrainMap;