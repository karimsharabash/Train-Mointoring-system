import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route} from 'react-router-dom'


import SignUp from './components/sign-up-admin/signUp'
import addUser from './components/add-user/addUser'
import SideBar from './components/sideBar/side-bar'
import TrainMap from "./components/Trip/map/trainMap"
import Trips from "./components/Trip/map/trips"
import navbar from "./components/navbar/navbar"
import NewTrip from "./components/Trip/newTrip/newTrip"
import loginEmployee from "./components/loginEmployee/loginEmployee"
import AuthRoute from "./authentication/admin-authentication"
import AuthRouteUser from "./authentication/user-authentication"


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* Routes for the admin */}
     <Route exact path='/login/admin' component={SignUp}/>
     <AuthRoute path='/Admin' component={SideBar}/> 
     {/* Routes for the user  */}
     <Route exact  path='/user/login' component={loginEmployee}/>
     <AuthRouteUser exact path='/' component={navbar}/>
    {/* <Route path='/map' component={TrainMap}/>  */}
     <AuthRouteUser path='/adduser' component={addUser}/> 
     <AuthRouteUser path='/Trips' component={Trips}/> 
     {/* <Route path='/trip/:tripId' component={}/>  */}
     {/* <Route path='/newDriver' component={}/>  */}
     <AuthRouteUser path='/newTrip' component={NewTrip}/> 
     </div>
     </BrowserRouter>
  );
}

export default App;
