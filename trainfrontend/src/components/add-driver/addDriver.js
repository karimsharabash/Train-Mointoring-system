import React, { Component } from 'react';
import Input from "../DumbComponents/Input"
import Button from "../DumbComponents/button"
import SimpleReactValidator from 'simple-react-validator';
import axios from "axios"

class AddDriver extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.formRef = null;

        this.state = {
            newDriver: {
                driverName: '',
                nationalId: '',
                phoneNumber: '',
            },
        };
    }
    handleChange(e) {

        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => {
            return {
                newDriver: {
                    ...prevState.newDriver, [name]: value
                },

            }

        })
    }
    submitForm(e) {
        e.preventDefault();
        if (this.validate()) {
            if (this.SendToServer(this.state)) {
                this.props.history.push("/")
            }
        }
        this.formRef.reset();
    }
    SendToServer(driver) {
        axios.post("http://localhost:5000/driver/reg", driver)
            .then(res => {
                console.log(res)
            })
    }

    validate() {
        if (this.validator.allValid()) {
            return true;
        } else {
            this.validator.showMessages();  
            this.forceUpdate();
            return false
        }
    }

    render() {
        return (
            <form className="container " style={{ marginLeft: "30%" }} ref={(ref) => this.formRef = ref}
                onSubmit={this.submitForm} >
                <fieldset>

                    <h2 style={{ marginTop: "2%", marginBottom: "5%" }} >New Driver Information</h2>

                    <Input title="Driver Name" name="driverName" placeholder="e.g. Ebrahim" handleChange={this.handleChange} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center', marginRight: "8%" }}>
                        {this.validator.message('driverName', this.state.newDriver.driverName, 'required|alpha_num')}
                    </div>

                    <Input title="National ID" name="nationalId" placeholder="e.g. 45871290235120" handleChange={this.handleChange} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center', marginRight: "8%" }}>
                        {this.validator.message('nationalId', this.state.newDriver.nationalId, 'required|alpha_num')}
                    </div>

                    <Input title="Phone Number" name="phoneNumber" placeholder="01111232050" handleChange={this.handleChange} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center', marginRight: "8%" }}>
                        {this.validator.message('phoneNumber', this.state.newDriver.phoneNumber, 'required|alpha_num')}
                    </div>
                    <Button className="btn btn-danger btn-block btn-large" title="Submit"
                        action={this.submitForm}
                        style={{ display: 'flex', justifyContent: 'center', marginLeft: "20%" }} />
                </fieldset>
            </form >
        )
    }
}

export default AddDriver;