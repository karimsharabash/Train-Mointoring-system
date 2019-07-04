import React  from 'react';
import { NavLink,Link } from 'react-router-dom'
const Navbar = ()=>{
  let  logout=()=>{
        sessionStorage.removeItem('token');
     
      }
    return (
       
  <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark ">
        <a href="#" className="navbar-brand my-3">T.M.S</a>
        {/* <button type="button" className="navbar-toggler my-3" data-toggle="collapse" data-target="#navbarCollapse1">
            <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="collapse navbar-collapse" id="navbarCollapse1">
            <div className="navbar-nav">
            <Link to="/home"  className="nav-item nav-link font-weight-bold">Home</Link>
            <NavLink to="/user/trips"  activeClassName="active" className="nav-item nav-link font-weight-bold ">Trips</NavLink>
            </div>
        </div>
        <div>
        <Link to="/user/newDriver" className="btn nav-item btn-outline-info " style={{marginRight:"10px"}}>add driver</Link>
      
        <NavLink to="/user/newTrip" className="btn nav-item btn-outline-info" style={{marginRight:"20px"}} >start new trip</NavLink>
        <Link to="/" onClick={logout} className="btn nav-item btn-outline-info">logout</Link>
        </div>
    </nav>
	
    )
}

export default Navbar;