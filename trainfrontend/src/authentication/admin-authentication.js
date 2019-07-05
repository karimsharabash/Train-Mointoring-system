import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import decode from 'jwt-decode'
import {Redirect,Route} from 'react-router-dom'

const AuthRoute=({component:Component,...rest})=>(
<Route {...rest} render={props=>(checkauth()?
    (<Component{...props}/>):
    (<Redirect to={{pathname:'/admin/login'}}/> )
    )} />)

const checkauth=()=>{
    let token=sessionStorage.getItem('token')
    if(!token)return false;
    let tokenData = decode(token);
    // token exp data is represented in second but get time returns millsecond
    //so we divide by 1000 to compare 
    if(tokenData.exp < (new Date().getTime() / 1000))return false;
    if(tokenData.role=="admin")return true;
    } 
    

export default AuthRoute ;