
import React, { Component } from 'react'
import Requests from '../../authentication/authenticationWithApi'
import axios from 'axios'
import Input from "../DumbComponents/Input"
import Button from "../DumbComponents/button"
import SimpleReactValidator from 'simple-react-validator';

class adminLogin extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        // this.sendDataToserver = this.sendDataToserver.bind(this)
    }
    state={
        nationalId:null,
        password:null,
        userError:false,
        passwordError:false
    }
       async  sendDataToserver(){
          
        const response = await axios.post('http://localhost:5000/user/login/admin',
        {data:{nationalId:this.state.nationalId ,password:this.state.password }})
      
        if(response.data==="passwordError")
        {
            //error message 
           this.setState({passwordError:true,userError:false});
        }else if(response.data==="userError")
        {
            //error message 
           this.setState({userError:true,passwordError:false});
        } 
        else{
            sessionStorage.setItem('token',response.data.toString())
            this.props.history.push('/Admin/dashboard');
            
        }
    }

    handlesubmit=(e)=>{
     e.preventDefault();
     this.sendDataToserver();
    //  this.refs.nationalId.value="";
    //  this.refs.password.value="";  
    
    }
    addvalue=(e)=>{

        this.setState({[e.target.name]:e.target.value})

    }
    render() {

        return (
            <form className="container " onSubmit={this.handlesubmit} >
                <fieldset>
                    <h2 style={{ marginTop: "10%", marginBottom: "5%" }} >Admin Login</h2>
                    <Input title="national Id" name="nationalId" placeholder="e.g. 12345" handleChange={this.addvalue} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center'}}>
                        {this.validator.message('national ID', this.state.nationalId, 'required|alpha_num')}
                    </div>
                    {this.state.userError &&  <div className="text-danger" style={{ display: 'flex', justifyContent: 'center'}}>
                    <p>this is invalid admin national ID</p>
                    </div>    
                    }
                    <Input title="Password" name="password" placeholder="*********" handleChange={this.addvalue} type="password" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center' }}>
                        {this.validator.message('password', this.state.password, 'required|alpha_num')}
                    </div>
                    {this.state.passwordError &&  <div className="text-danger" style={{ display: 'flex', justifyContent: 'center'}}>
                    <p>Wrong password</p>
                    </div>    
                    }
                    <Button className="btn btn-danger btn-block btn-large" title="Submit" action={this.handlesubmit} style={{ display: 'flex', justifyContent: 'center', marginLeft: "-9.5%" }} />
                </fieldset>
            </form>
        )
    }
}


export default adminLogin ;