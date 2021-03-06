import React, { Component } from "react";
import axios from 'axios'
import {
  FormGroup,
  FormControl,
  FormLabel,
  Button
} from "react-bootstrap";

const API_URL = 'http://localhost:8080/user';
  export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone:"",
      password: "",
      confirmPassword: "",
      status: ""
    };
    this.registerUser = this.registerUser.bind(this);
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.phone.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  registerUser() {
    const url = API_URL + '/register';
    const registerData = { name:this.state.name,
                           email:this.state.email,
                           phone:this.state.phone,
                           password:this.state.password};
    axios.post(url,registerData )
      .then(res => {
        this.setMessage(res.data.statusCode);
      })
  }

  setMessage(response){
    switch(response){
      case 301: this.status = "User Already Registered";
                break;
      case 201: this.status = "Failed to Register";
                break;
      case 101: this.status = "User Successfully Registered";
                break;
      default : this.status = "Registration Failed Unexpectedly";
    }
    alert(this.status);
    sessionStorage.setItem('loggedUser','login')
    console.log("LoggedUser value: ",sessionStorage.getItem('loggedUser'))
    window.location.reload();
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.registerUser();
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
      </form>
    );
  }

  login() {
    sessionStorage.setItem('loggedUser', 'login')
    window.location.reload();
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
          <legend>Registration Form</legend>
          <FormGroup controlId="name" bssize="large">
          <FormLabel>Name</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bssize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="phone" bssize="large">
          <FormLabel>Phone</FormLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.phone}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bssize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bssize="large">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button
            block
            bssize="large"
            disabled={!this.validateForm()}
            type="submit">
            Submit
        </Button>
        <Button
            block
            bssize="large"
            onClick={this.login}>
            Already a member? Sign in
        </Button>
      </form>
    );
  }

  render() {
    return (
      <div className="CustomForm">
      {this.renderForm()}
      </div>
    );
  }
}