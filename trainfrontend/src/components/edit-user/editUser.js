import React, { Component } from 'react';
// import axios from 'axios';
import Requests from '../../authentication/authenticationWithApi'

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onChangePersonID = this.onChangePersonID.bind(this);
        // this.onChangePersonpassword = this.onChangePersonpassword.bind(this);
        this.onChangepersonImage = this.onChangepersonImage.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            UserName: '',
            nationalId: '',
            // password: '',
            userImg: ''
        };
    }

    componentDidMount() {
        let axios = Requests();

        axios.get('http://localhost:5000/user/edit/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    UserName: response.data.userName,
                    nationalId: response.data.nationalId,
                    // password: response.data.password,
                    // userImg: response.data.userImg,

                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangePersonName(e) {
        this.setState({
            UserName: e.target.value
        });
    }
    onChangePersonID(e) {
        this.setState({
            nationalId: e.target.value
        })
    }
    onChangepersonImage(e) {
        this.setState({
            userImg: e.target.value
        })
    }
    // onChangePersonpassword(e) {
    //     this.setState({
    //         password: e.target.value
    //     })
    // }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            userName: this.state.UserName,
            nationalId: this.state.nationalId,
            // password: this.state.password
            // userImg: this.state.userImg,
        };
        let axios = Requests();
        axios.post('http://localhost:5000/user/update/' + this.props.match.params.id, user)
            .then(res => console.log(res));
            axios.get('http://localhost:5000/user')
                .then(response => {
                    this.setState({ users: response.data });
                })
        this.props.history.push('/Admin/dashboard/list');
        window.location.reload();
    }

    render() {
        return (
            <div style={{ marginTop: 10 , marginLeft:"20%",marginRight:"10%"}}>
                <h3 align="center">Update User Info</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Person Name:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.UserName}
                            onChange={this.onChangePersonName}
                        />
                    </div>
                    <div className="form-group">
                        <label>nationalId </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.nationalId}
                            onChange={this.onChangePersonID}
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>password </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePersonpassword}
                        />
                    </div> */}
{/* 
                     <div className="form-group">
                        <label>User Image </label>
                        <input type="file"
                            className="form-control"
                            value={this.state.userImg}
                            onChange={this.onChangepersonImage}
                        />
                    </div>
                     */}
                    <div className="form-group">
                        <input type="submit"
                            value="Update User"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}