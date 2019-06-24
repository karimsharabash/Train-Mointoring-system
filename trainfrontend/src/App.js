import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route } from 'react-router-dom'


import SignUp from './components/sign-up-admin/signUp'

import SideBar from './components/sideBar/side-bar'
import navbar from "./components/navbar/navbar"
import loginEmployee from "./components/loginEmployee/loginEmployee"
import AuthRoute from"./authentication/admin-authentication"
import Dashboard from './components/Dashboard/Dashboard';
import Trips from './components/Trip/map/trips';
import NewTrip from './components/Trip/newTrip/newTripForm';
import AddUser from './components/add-user/addUser'
import Home from './components/Home/home';
import AddDriver from './components/add-driver/addDriver'

import ListAllUsers from './components/list-all-users/listAllUsers';
import EditUser from './components/edit-user/editUser';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* Routes for dashboard  */}
      <AuthRoute path='/Admin/dashboard' component={Dashboard}/>
      <AuthRoute path='/Admin/users' component={ListAllUsers}/>
      <Route path='/Admin/adduser' component={AddUser}/> 
     
      <AuthRoute path='/Admin/dashboard/list' component={ListAllUsers}/>
      <AuthRoute path='/edit/:id' component={ EditUser } />
      <AuthRoute exact path='/login/admin' component={SignUp}/>
      <AuthRoute path='/Admin' component={SideBar}/> 
    
     {/* Routes for the user  */}
     <Route exact  path='/login' component={loginEmployee}/>
     <Route  path='/user' component={navbar}/>
     <Route path='/user/Trips' component={Trips}/> 
     {/* <Route path='/trip/:tripId' component={}/>  */}
     <Route path='/user/newDriver' component={AddDriver}/> 
     <Route path='/user/newTrip' component={NewTrip}/> 
     {/* Route for naaadaaa home component  */}
     <Route exact path='/' component={Home}/>
     </div>
     </BrowserRouter>
 
  );
}


export default App;
