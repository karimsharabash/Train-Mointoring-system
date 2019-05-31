import React, { Component } from 'react';
import { NavLink,Link } from 'react-router-dom'
const Navbar = ()=>{
    return (

  <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark ">
        <a href="#" className="navbar-brand my-3">T.M.S</a>
        {/* <button type="button" className="navbar-toggler my-3" data-toggle="collapse" data-target="#navbarCollapse1">
            <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="collapse navbar-collapse" id="navbarCollapse1">
            <div className="navbar-nav">
            <Link to="/"  className="nav-item nav-link font-weight-bold">Home</Link>
            <NavLink to="/trips"  activeClassName="active" className="nav-item nav-link font-weight-bold ">Trips</NavLink>
            </div>
        </div>
        <div>
        <Link to="/newDriver" className="btn nav-item btn-outline-info " style={{marginRight:"10px"}}>add driver</Link>
      
        <NavLink to="/newTrip" className="btn nav-item btn-outline-info" style={{marginRight:"20px"}} >start new trip</NavLink>
        <Link to="/login" className="btn nav-item btn-outline-info">login</Link>
        </div>
    </nav>
	
    )
}

export default Navbar;