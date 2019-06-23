import React, { Component } from 'react';
import Input from "../DumbComponents/Input"
import Button from "../DumbComponents/button"
import ImageUploader from 'react-images-upload';
import SimpleReactValidator from 'simple-react-validator';
import Requests from '../../authentication/authenticationWithApi'

class AddUser extends Component {

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
            },
            userImg: ''
        };

    }
    handleChange(e) {

        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => {
            return {
                newUser: {
                    ...prevState.newUser, [name]: value
                },

            }

        })
    }
    // handleChangeFile(event) {
    //     this.setState({
    //         userImg: URL.createObjectURL(event.target.files[0])
    //     })
    //   }
    submitForm(e) {
        e.preventDefault();
        if (this.validate()) {
            if (this.SendToServer(this.state)) {
                this.props.history.push("/Admin/dashboard")
            }
        }
        this.formRef.reset();
    }
    SendToServer(user) {
       let axios=Requests();
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

    render() {
        return (
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

                    <Input title="Password" name="password" placeholder="Password" handleChange={this.handleChange} type="text" />
                    <div className="text-danger" style={{ display: 'flex', justifyContent: 'center', marginRight: "8%" }}>
                        {this.validator.message('password', this.state.newUser.password, 'required|alpha_num')}
                    </div>
                    {/* <input className="form-control " type="file"
                        onChange={this.handleChangeFile} /> */}

                    
                    <ImageUploader style={{ marginLeft: "-5.5%" }}
                        name="userImage"
                        withIcon={true}
                        buttonText='Choose Your User Image '
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.png', '.jpeg']}
                        maxFileSize={5242880}
                    />
                    <Button className="btn btn-danger btn-block btn-large" title="Submit"
                        action={this.submitForm}
                        style={{ display: 'flex', justifyContent: 'center', marginLeft: "25%" }} />
                </fieldset>
            </form >
        )
    }
}

export default AddUser;