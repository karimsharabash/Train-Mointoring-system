import React, { Component } from 'react';
import Input from "../DumbComponents/Input"
import Button from "../DumbComponents/button"
import ImageUploader from 'react-images-upload';
import SimpleReactValidator from 'simple-react-validator';
import Requests from '../../authentication/authenticationWithApi'

class AddUser extends Component {

    selectedfile;
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        // this.handleChangeFile = this.handleChangeFile.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.formRef = null;

        this.state = {
            newUser: {
                UserName: '',
                nationalId: '',
                Password: '',
                userImg: ''
            },

        };

    }
    handleChange(e) {

        let value = e.target.value;
        let name = e.target.name;

        if (name == "userImg") {
            value = this.refs.imageToUpload.files[0].name;
            console.log(value)
            this.setState(prevState => {
                return {
                    newUser: {
                        ...prevState.newUser, [name]: value
                    },

                }

            })
        }
        else {
            this.setState(prevState => {
                return {
                    newUser: {
                        ...prevState.newUser, [name]: value
                    },

                }

            })
        }
    }
    // handleChangeFile(event) {
    //     this.setState({
    //         userImg: URL.createObjectURL(event.target.files[0])
    //     })
    //   }
    submitForm(e) {

        e.preventDefault();
        console.log(this.refs.imageToUpload.files[0])
        let x = this.refs.imageToUpload.files[0].name;
        let img = new FormData();
        img.append('photo', this.refs.imageToUpload.files[0])
       let  axios=Request();
        axios.post('http://localhost:5000/user/img_data', img)
            .then(res => { console.log(res) })
        if (this.validate()) {

            console.log(this.state.newUser.userImg)
            if (this.SendToServer(this.state)) {

                this.props.history.push("/Admin/dashboard")
            }
        }
        this.formRef.reset();
    }
    SendToServer(user) {
        let axios = Requests();
        axios.post("http://localhost:5000/user/reg", user)
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
    onDrop(picture) {
        this.setState({
            userImg: this.state.userImg.concat(picture),
        });
    }

    uploading(event) {
        console.log(event.target.files[0])
    }
    render() {
        return (<div>
            <form className="container " style={{ marginLeft: "30%" }} ref={(ref) => this.formRef = ref}
                onSubmit={this.submitForm} >
                <fieldset>

                    <h2 style={{ marginTop: "2%", marginBottom: "5%" }} >New User Information</h2>

                    <Input title="User Name" name="UserName" placeholder="e.g. Taqwa " handleChange={this.handleChange} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center', marginRight: "8%" }}>
                        {this.validator.message('UserName', this.state.newUser.UserName, 'required|alpha_num')}
                    </div>

                    <Input title="National ID" name="nationalId" placeholder="e.g. 45871290235120" handleChange={this.handleChange} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center', marginRight: "8%" }}>
                        {this.validator.message('nationalId', this.state.newUser.nationalId, 'required|alpha_num')}
                    </div>

                    <Input title="Password" name="Password" placeholder="Password" handleChange={this.handleChange} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center', marginRight: "8%" }}>
                        {this.validator.message('password', this.state.newUser.Password, 'required|alpha_num')}
                    </div>
                    {/* <input className="form-control " type="file"
                        onChange={this.handleChangeFile} /> */}

                    <span>Selected Image</span>
                    <input style={{marginBottom :"4%"}} type="file" name="userImg" className="chooseFileStyle" onChange={this.handleChange} ref="imageToUpload" />
                    <div>
                    </div>
                    <Button style={{ display: 'flex', justifyContent: 'center', marginLeft: "20%" }} className="btn btn-danger btn-block btn-large" title="Submit"
                        action={this.submitForm} />
                </fieldset>
            </form >
        </div>
        )
    }
}

export default AddUser;