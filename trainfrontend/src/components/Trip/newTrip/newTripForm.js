import React, { Component } from 'react';
import Input from "../../DumbComponents/Input"
import Button from "../../DumbComponents/button"
import SimpleReactValidator from 'simple-react-validator';
import axios from "axios"

class NewTrip extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            newTrip: {
                trainId: '',
                driverID: '',
                source: '',
                dest: ''
            },
            valid: false
        }
    }
    handleChange(e) {

        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => {
            return {
                newTrip: {
                    ...prevState.newTrip, [name]: value
                }
            }
        })
    }

    submitForm(e) {
        e.preventDefault();
        if (this.validate()) {
            if (this.startNewtrip(this.state.newTrip)) {
                this.props.history.push("/trips")
            }
        }
    }

    startNewtrip(tripInfo) {
        axios.post("http://localhost:5000/trip", tripInfo)
            .then(res => {
                console.log(res)
            })
    }

    validate() {
        if (this.validator.allValid()) {
            return true;
        } else {
            this.validator.showMessages();  // rerender to show messages for the first time
            this.forceUpdate();// you can use the autoForceUpdate option to do this automatically`
            return false
        }
    }

    render() {
        return (
            <form className="container " onSubmit={this.submitForm} >
                <fieldset>

                    <h2 style={{ marginTop: "2%", marginBottom: "5%" }} >New Trip Information</h2>
                    <Input title="Train Id" name="trainId" placeholder="e.g. 12345" handleChange={this.handleChange} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center', marginRight: "8%" }}>
                        {this.validator.message('train ID', this.state.newTrip.trainId, 'required|alpha_num')}
                    </div>
                    <Input title="Driver ID" name="driverID" placeholder="e.g. 120" handleChange={this.handleChange} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center', marginRight: "8%" }}>
                        {this.validator.message('driver ID', this.state.newTrip.driverID, 'required|alpha_num')}
                    </div>
                    <Input title="Trip Source" name="source" placeholder="SOURCE" handleChange={this.handleChange} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center', marginRight: "8%" }}>
                        {this.validator.message('source station', this.state.newTrip.source, 'required|alpha_num')}
                    </div>
                    <Input title="Trip Destination" name="dest" placeholder="DESTINATION" handleChange={this.handleChange} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center', marginRight: "8%" }}>
                        {this.validator.message('Destination', this.state.newTrip.dest, 'required|alpha_num')}
                    </div>
                    <Button className="btn btn-danger btn-block btn-large" title="Submit" action={this.submitForm} style={{ display: 'flex', justifyContent: 'center', marginLeft: "-9.5%" }} />
                </fieldset>
            </form>
        )
    }
}

export default NewTrip;
