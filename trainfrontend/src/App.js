import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route} from 'react-router-dom'


import SignUp from './components/sign-up-admin/signUp'
import addUser from './components/add-user/addUser'
import SideBar from './components/sideBar/side-bar'
import TrainMap from "./components/TrainData/map/trainMap"
import Trips from "./components/TrainData/map/trips"
import navbar from "./components/navbar/navbar"
import loginEmployee from "./components/loginEmployee/loginEmployee"
import AuthRoute from "./authentication/admin-authentication"
import AuthRouteUser from "./authentication/user-authentication"


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* login for the admin */}
     <Route exact path='/login/admin' component={SignUp}/>
     <AuthRoute path='/Admin' component={SideBar}/> 
     {/* login for the user  */}
     <Route exact path='/login/user' component={loginEmployee}/>
     <AuthRouteUser  path='/' component={navbar}/>
    {/* <Route path='/map' component={TrainMap}/>  */}
     <AuthRouteUser path='/adduser' component={addUser}/> 
     <AuthRouteUser path='/Trips' component={Trips}/> 
     {/* <Route path='/trip/:tripId' component={}/>  */}
     {/* <Route path='/newDriver' component={}/>  */}
     {/* <Route path='/newTrip' component={}/>  */}
     </div>
     </BrowserRouter>
  );
}

export default App;
