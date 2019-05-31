import React, { Component } from 'react'
import './side-bar.css'
class SideBar extends Component {
  
  render() {
    return (
      <div className="nav-side-menu">
        <div className="brand">Adminstartion</div>
        <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

        <div className="menu-list">

          <ul id="menu-content" className="menu-content collapse out">
            <li>
              <a href="#">
                <i className="fa fa-dashboard fa-lg"></i> Dashboard
                      </a>
            </li>

            <li data-toggle="collapse" data-target="#products" className="collapsed ">
              <a href="#"><i className="fa fa-gift fa-lg"></i>Manage User <span className="arrow"></span></a>
            </li>
            <ul className="sub-menu collapse" id="products">
              <li><a href="/adduser">Add User</a></li>
              <li><a href="/Deleteuser">Delete User</a></li>
             </ul>
              <li>
              <a href="#">
                <i className="fa fa-user fa-lg"></i> Profile
                      </a>
            </li>

            <li>
              <a href="#">
                <i className="fa fa-users fa-lg"></i> Users
                      </a>
            </li>
          </ul>
        </div>
      </div>)

  }


}



export default SideBar;
