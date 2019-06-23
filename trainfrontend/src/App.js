import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route } from 'react-router-dom'


import SignUp from './components/sign-up-admin/signUp'
import AddUser from './components/add-user/addUser'
import SideBar from './components/sideBar/side-bar'
import navbar from "./components/navbar/navbar"
import loginEmployee from "./components/loginEmployee/loginEmployee"
import LogsTable from './components/Logs-for-admin/logs'
import Dashboard from './components/Dashboard/Dashboard';
import Trips from './components/Trip/map/trips';
import NewTrip from './components/Trip/newTrip/newTripForm';
import ListUsers from './components/list-users/listUsers';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* Routes for dashboard  */}
      <Route path='/Admin/dashboard' component={Dashboard}/>
      {/* <Route path='/Admin' exact component={ListUsers}/> */}
      {/* Routes for the admin */}

     <Route path='/logs' component={LogsTable}/> 
     <Route exact path='/login/admin' component={SignUp}/>
     <Route path='/Admin' component={SideBar}/> 
     {/* Routes for the user  */}
     <Route exact  path='/user/login' component={loginEmployee}/>
     <Route exact path='/' component={navbar}/>
    {/* <Route path='/map' component={TrainMap}/>  */}
     <Route path='/Admin/adduser' component={AddUser}/> 
     <Route path='/Trips' component={Trips}/> 
     {/* <Route path='/trip/:tripId' component={}/>  */}
     {/* <Route path='/newDriver' component={}/>  */}
     <Route path='/newTrip' component={NewTrip}/> 
     </div>
     </BrowserRouter>
 
  );
}


export default App;
