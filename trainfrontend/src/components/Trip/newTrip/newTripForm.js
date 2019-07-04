import React, { Component } from 'react';
import Input from "../../DumbComponents/Input"
import Button from "../../DumbComponents/button"
import SimpleReactValidator from 'simple-react-validator';
import Request from "../../../authentication/authenticationWithApi"
import DropDownMenu from '../../DumbComponents/Select';
import Select from 'react-dropdown-select'
class NewTrip extends Component {
    selectedoption = "";
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
            valid: false,
            drivers: [],
            selectedDriver: "",

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
    onChange(e) {
        console.log(e)
        if (e[0]) {
            let name = "driverID";
            let value = e[0].value;
            let label = e[0].label;
            console.log(e[0].label);
            this.setState(prevState => {
                return {
                    newTrip: {
                        ...prevState.newTrip, [name]: value
                    }
                }
            })
        }

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
        let axios=Request();
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

    componentDidMount() {
        let axios=Request();
        axios.get("http://localhost:5000/driver")
            .then((response) => {
                return response.data
            })
            .then(data => {
                let driversFromApi = data.map(driver => { return { value: driver._id, label: driver.driverName } })
                this.setState({ drivers: driversFromApi });
            }).catch(error => {
                console.log(error);
            });
        // axios.get("http://localhost:5000/driver")
        //     .then((response) => {
        //         this.setState({
        //             drivers: response.data
        //         })
        //     })
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
                    <div className="form-group row">
                        <label htmlFor="driverID" className="col-md-4 col-form-label">driver Name</label>
                        <div className="col-md-3" >
                            <Select value={this.state.selectedDriver} name="driverID" options={this.state.drivers}
                                onChange={(e) => this.onChange(e)} />
                        </div></div>
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
