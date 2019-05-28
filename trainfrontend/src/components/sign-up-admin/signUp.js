import React, { Component } from 'react'
import './signup.css'
import axios from 'axios'
class SignUp extends Component {
    state={
        name:null,
        password:null
    }
    handlesubmit=(e)=>{
     e.preventDefault();
     console.log(this.state)
     this.refs.name.value="";
     this.refs.password.value="";  
     this.props.history.push('/Admin');
    
    }
    addvalue=(e)=>{

        this.setState({[e.target.id]:e.target.value})
       
       
    
    }
    render() {

        return (
            <div className="login">
                <h1>Login</h1>
                <form  onSubmit={this.handlesubmit}>
                    <input type="text" name="u" ref="name" id="name"  placeholder="Username" required="required" onChange={this.addvalue} />
                    <input type="password"ref="password" name="p" id="password" placeholder="Password" onChange={this.addvalue} required="required" />
                    <button type="submit" className="btn btn-primary btn-block btn-large">Login</button>
                </form>
            </div>
        )
    }
}


export default SignUp ;