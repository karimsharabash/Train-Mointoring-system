import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';


import SignUp from './components/sign-up-admin/signUp'
import addUser from './components/add-user/addUser'
import SideBar from './components/sideBar/side-bar'
import {BrowserRouter,Route} from 'react-router-dom'
import TrainMap from "./components/TrainData/map/trainMap"
import MapContainer from "./components/TrainData/map/mapContainer"
function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Route exact path='/' component={SignUp}/>
     <Route path='/Admin' component={SideBar}/> 
     <Route path='/map' component={MapContainer}/> 
     </div>
     </BrowserRouter>
  );
}

export default App;
