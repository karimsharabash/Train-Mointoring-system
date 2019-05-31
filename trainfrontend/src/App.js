import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';


import SignUp from './components/sign-up-admin/signUp'
import addUser from './components/add-user/addUser'
import SideBar from './components/sideBar/side-bar'
import {BrowserRouter,Route} from 'react-router-dom'
import TrainMap from "./components/TrainData/map/trainMap"
import Trips from "./components/TrainData/map/trips"
import navbar from "./components/navbar/navbar"
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Route  path='/' component={navbar}/>
     <Route exact path='/' component={SignUp}/>
     <Route path='/Admin' component={SideBar}/> 
     <Route path='/Trips' component={Trips}/> 
     {/* <Route path='/trip/:tripId' component={}/>  */}
     {/* <Route path='/newDriver' component={}/>  */}
     {/* <Route path='/newTrip' component={}/>  */}
     </div>
     </BrowserRouter>
  );
}

export default App;
