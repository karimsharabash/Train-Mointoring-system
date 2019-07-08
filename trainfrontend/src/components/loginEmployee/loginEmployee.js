import React, { Component } from 'react'
import './loginEmployee.css'
import axios from 'axios'
import Input from "../DumbComponents/Input"
import Button from "../DumbComponents/button"
import SimpleReactValidator from 'simple-react-validator';
class loginEmployee extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        // this.sendDataToserver = this.sendDataToserver.bind(this)
    }
    state = {
        userName: null,
        password: null,
        userError: false,
        passwordError: false
    }
    async  sendDataToserver() {
        const response = await axios.post('http://localhost:5000/user/login',
            { data: { userName: this.state.userName, password: this.state.password } })

        if (response.data === "passwordError") {
            //error message 
            this.setState({ passwordError: true, userError: false });
        } else if (response.data === "userError") {
            //error message 
            this.setState({ userError: true, passwordError: false });
        }
        else {
            sessionStorage.setItem('token', response.data.toString())
            this.props.history.push('/Home');

        }
    }

    handlesubmit = (e) => {
        e.preventDefault();
        this.sendDataToserver();

    }
    addvalue = (e) => {

        this.setState({ [e.target.id]: e.target.value })

    }
    render() {

        return (
            <form className="container " onSubmit={this.handlesubmit} >
                <fieldset>
                    <h2 style={{ marginTop: "10%", marginBottom: "5%" }} >Engineer Login</h2>
                    <Input title="username" name="userName" placeholder="e.g. karim" handleChange={this.addvalue} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center' }}>
                        {this.validator.message('username', this.state.userName, 'required|alpha_num')}
                    </div>
                    {this.state.userError && <div className="text-danger" style={{ display: 'flex', justifyContent: 'center' }}>
                        <p>this is invalid Engineer username</p>
                    </div>
                    }
                    <Input title="Password" name="password" placeholder="*********" handleChange={this.addvalue} type="password" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center' }}>
                        {this.validator.message('password', this.state.password, 'required|alpha_num')}
                    </div>
                    {this.state.passwordError && <div className="text-danger" style={{ display: 'flex', justifyContent: 'center' }}>
                        <p>Wrong password</p>
                    </div>
                    }
                    <Button className="btn btn-danger btn-block btn-large" title="Submit" action={this.handlesubmit} style={{ display: 'flex', justifyContent: 'center', marginLeft: "-9.5%" }} />
                </fieldset>
            </form>
        )
    }
}


export default loginEmployee;