
import React, { Component } from 'react';
// import axios from 'axios';
import TableRow from '../TableRow/TableRow';
import Requests from '../../authentication/authenticationWithApi'

export default class ListAllUsers extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [] };
    }
    componentDidMount() {

        let axios = Requests();
        axios.get('http://localhost:5000/user')
            .then(response => {
              
                
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    tabRow() {
        return this.state.users.map(function (object, i) {
            return <TableRow data={object} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">Users List</h3>
                <table className="table table-striped"  style={{ marginTop: "3%", marginLeft:"25%",marginRight:"10%",width:"70%"}}>
                        
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>User National ID</th>
                                    <th colSpan="2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.tabRow()}
                            </tbody>
                </table>
            </div>
                    );
                }
            }
