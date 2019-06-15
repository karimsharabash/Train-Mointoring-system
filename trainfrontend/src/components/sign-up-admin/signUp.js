import React, { Component } from 'react'
import './signup.css'
import axios from 'axios'
class SignUp extends Component {
 
    state={
        nationalId:null,
        password:null
    }
       async  sendDataToserver(){
        const response = await axios.post('http://localhost:5000/user/login',{data:this.state})
        if(response.data==="invalid password"||response.data==="no such a user")
        {
           console.log(response)
        }
        else{
            sessionStorage.setItem('token',response.data.toString())
            this.props.history.push('/Admin');
            
        }
    }

    handlesubmit=(e)=>{
     e.preventDefault();
     this.sendDataToserver();
     this.refs.nationalId.value="";
     this.refs.password.value="";  
    
    }
    addvalue=(e)=>{

        this.setState({[e.target.id]:e.target.value})
       
       
    
    }
    render() {

        return (
            <div className="login">
                <h1>Login</h1>
                <form  onSubmit={this.handlesubmit}>
                    <input type="text" name="u" ref="nationalId" id="nationalId"  placeholder="National ID" required="required" onChange={this.addvalue} />
                    <input type="password"ref="password" name="p" id="password" placeholder="Password" onChange={this.addvalue} required="required" />
                    <button type="submit" className="btn btn-primary btn-block btn-large">Login</button>
                </form>
            </div>
        )
    }
}


export default SignUp ;