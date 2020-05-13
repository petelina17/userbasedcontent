import * as React from 'react'
import {Link} from 'react-router-dom'
import './registerForm.css'
import {TextField, Button} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

let users = []

class RegisterForm extends React.Component {
  constructor() {
    super()
    this.state = {
      userCreated: false,
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNr: '',
      passwordError: '',
      emailError: '',
      phoneError: '',
      fullNameError: '',
    }
  }

  change = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  validate = () => {
    let isError = false
    if (
        this.state.email.indexOf('@') === -1 ||
        this.state.email.indexOf('.') === -1
    ) {
      this.setState({emailError: 'Email must contain \'@\' and \'.\'.'})
      isError = true
    }

    if (this.state.fullName.length < 4) {
      this.setState({
        fullNameError: 'More than 4 characters.',
      })
      isError = true
    }
    if (
        (this.state.password !== this.state.confirmPassword &&
            this.state.password.length > 6) ||
        this.state.confirmPassword.length > 6
    ) {
      this.setState({passwordError: 'Your passwords must match.'})
      isError = true
    }
    if (
        (this.state.password === this.state.confirmPassword &&
            this.state.password.length < 6) ||
        this.state.confirmPassword.length < 6
    ) {
      this.setState({passwordError: 'Minimum 6 characters long.'})
      isError = true
    }

    if (
        (this.state.password !== this.state.confirmPassword &&
            this.state.password.length < 6) ||
        this.state.confirmPassword.length < 6
    ) {
      this.setState({
        passwordError: 'Min 6 characters & same passwords',
      })
      isError = true
    }

    if (this.state.phoneNr.length !== 10) {
      this.setState({
        phoneError: 'Min and maximum 10 numbers long',
      })
      isError = true
    }

    return isError
  }

  submit = (e) => {
    // e.preventDefault();
    this.setState({
      fullNameError: '',
      passwordError: '',
      phoneError: '',
      emailError: '',
    })
    const error = this.validate()
    if (!error) {
      this.setState({
        error: false,
        userCreated: true,
        fullNameError: '',
        passwordError: '',
        phoneError: '',
        emailError: '',
      })

      // SAVE VALUES OF USER TO DATABASE
      let user = {
        fullname: this.state.fullName,
        phoneNumber: this.state.phoneNr,
        username: this.state.email,
        password: this.state.password,
      }

      fetch('http://localhost:9000/register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(user),
      })
          .then(res => res.json())
          .catch(err => {
            console.log('[ERROR]', err)
          })
          .then(res => {
            console.log('register response: ', res)
            if (res.login === true) {
              // alert('You are registered!')

            }
          })
      let userCreated = true
      this.props.history.push('/login', userCreated)
    }
  }

  render() {
    return (
        <form className="register-box">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <PersonAddIcon fontSize="large"/>
            <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  marginLeft: '0.4rem',
                }}
            >
            REGISTER
          </span>
          </div>
          <TextField
              id="fullName"
              onChange={this.change}
              name="fullName"
              value={this.state.fullName}
              size="small"
              label="Full name"
              variant="outlined"
              helperText={this.state.fullNameError}
          />
          <TextField
              id="email"
              onChange={this.change}
              name="email"
              value={this.state.email}
              size="small"
              label="Email"
              variant="outlined"
              helperText={this.state.emailError}
          />
          <TextField
              id="phoneNr"
              onChange={this.change}
              name="phoneNr"
              value={this.state.phoneNr}
              size="small"
              label="Phonenumber"
              variant="outlined"
              helperText={this.state.phoneError}
          />
          <TextField
              id="password"
              type="password"
              onChange={this.change}
              name="password"
              value={this.state.password}
              size="small"
              label="Password"
              variant="outlined"
              helperText={this.state.passwordError}
          />
          <TextField
              type="password"
              onChange={this.change}
              name="confirmPassword"
              value={this.state.confirmPassword}
              size="small"
              label="Confirm Password"
              variant="outlined"
              helperText={this.state.passwordError}
          />
          <Button
              size="medium"
              id="login-btn"
              variant="contained"
              color="secondary"
              onClick={this.submit}
          >
            REGISTER
          </Button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
    )
  }
}

export default RegisterForm
