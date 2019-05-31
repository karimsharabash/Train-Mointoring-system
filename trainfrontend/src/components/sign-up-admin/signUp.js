import React, { Component } from 'react'
import './signup.css'
import axios from 'axios'
class SignUp extends Component {
 MyContext = React.createContext('test');
    state={
        name:null,
        password:null
    }
       async  sendDataToserver(){
        const response = await axios.post('http://localhost:5000/user/login',{data:this.state})
        if(response.data=="invalid password")
        {
           console.log(response)
        }
        else{
            console.log(response)
            this.props.history.push('/Admin');
        }
    }

    handlesubmit=(e)=>{
     e.preventDefault();
     this.sendDataToserver();
     this.refs.name.value="";
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
                    <input type="text" name="u" ref="name" id="name"  placeholder="Username" required="required" onChange={this.addvalue} />
                    <input type="password"ref="password" name="p" id="password" placeholder="Password" onChange={this.addvalue} required="required" />
                    <button type="submit" className="btn btn-primary btn-block btn-large">Login</button>
                </form>
            </div>
        )
    }
}


export default SignUp ;