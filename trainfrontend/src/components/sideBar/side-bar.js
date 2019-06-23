import React, { Component } from 'react'
import './side-bar.css'
class SideBar extends Component {

  logout=()=>{
    sessionStorage.removeItem('token');
    this.props.history.push('/login/Admin');
  }


  render() {
    return (
      <div>
      <div className="nav-side-menu floatToLeft">
        <div className="brand">Adminstartion</div>
        <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

        <div className="menu-list">

          <ul id="menu-content" className="menu-content collapse out">
            <li>
              <a href="/Admin/dashboard">
                <i className="fa fa-dashboard fa-lg"></i> Dashboard
                      </a>
            </li>

            <li data-toggle="collapse" data-target="#products" className="collapsed ">
              <a href=""><i className="fa fa-user fa-lg"></i>Manage User <span className="arrow"></span></a>
            </li>
            <ul className="sub-menu collapse" id="products">
              <li><a href="/Admin/adduser">Add User</a></li>
              <li><a href="/Admin/Deleteuser">Delete User</a></li>
             </ul>
            <li>
              <a href="#">
                <i className="fa fa-users fa-lg"></i> Users
                      </a>
            </li>
            <li data-toggle="collapse" data-target="" className="collapsed " >
              <a href="#"><i className="fa fa-history  fa-lg"></i>logs</a>
            </li>
            <li data-toggle="collapse" data-target="#products" className="collapsed " onClick={this.logout}>
              <a href="#"><i className="fa fa-sign-out fa-lg"></i>logout </a>
            </li>
          </ul>
        </div>
      </div>

      </div>
      )

  }


}



export default SideBar;
