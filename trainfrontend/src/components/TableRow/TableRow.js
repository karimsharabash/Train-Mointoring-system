import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Requests from '../../authentication/authenticationWithApi'


class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    let axios = Requests();
    axios.get('http://localhost:5000/user/delete/' + this.props.data._id)
      .then(window.location.reload())
      
      .catch(err => console.log(err))
  }
  render() {
    return (
      <tr >
        <td>
          {this.props.data.userName}
        </td>
        <td>
          {this.props.data.nationalId}
        </td>
        <td>
          {/* <button className="btn btn-primary">Edit</button> */}
          <Link to={"/edit/" + this.props.data._id} className="btn btn-primary">Edit</Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  }
}

export default TableRow;