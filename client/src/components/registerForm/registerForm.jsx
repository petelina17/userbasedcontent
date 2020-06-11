import {Link} from 'react-router-dom'
import './registerForm.css'
import {TextField, Button} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import logo from './logo.png'
import {checkLogin} from '../loginPage/loginpage'
import React, {useState, useContext} from 'react'
import StateContext from '../../contexts/StateContext'

export const RegisterForm = (props) => {
  const context = useContext(StateContext)
  const [state, setState] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNr: '',
    passwordError: '',
    emailError: '',
    phoneError: '',
    fullNameError: '',
  })

  // static contextType = StateContext

  let change = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }

  let validate = () => {
    let isError = false
    if (
        state.email.indexOf('@') === -1 ||
        state.email.indexOf('.') === -1
    ) {
      setState({...state, emailError: 'Email must contain \'@\' and \'.\'.'})
      isError = true
    }

    if (state.fullName.length < 4) {
      setState({
        ...state, fullNameError: 'More than 4 characters.',
      })
      isError = true
    }
    if (
        (state.password !== state.confirmPassword &&
            state.password.length > 6) ||
        state.confirmPassword.length > 6
    ) {
      setState({...state, passwordError: 'Your passwords must match.'})
      isError = true
    }
    if (
        (state.password === state.confirmPassword &&
            state.password.length < 6) ||
        state.confirmPassword.length < 6
    ) {
      setState({...state, passwordError: 'Minimum 6 characters long.'})
      isError = true
    }

    if (
        (state.password !== state.confirmPassword &&
            state.password.length < 6) ||
        state.confirmPassword.length < 6
    ) {
      setState({
        ...state, passwordError: 'Min 6 characters & same passwords',
      })
      isError = true
    }

    if (state.phoneNr.length !== 10) {
      setState({
        ...state, phoneError: 'Min and maximum 10 numbers long',
      })
      isError = true
    }

    return isError
  }

  const submit = (e) => {
    // e.preventDefault();
    setState({
      ...state,
      fullNameError: '',
      passwordError: '',
      phoneError: '',
      emailError: '',
    })
    const error = validate()
    if (!error) {
      setState({
        ...state,
        error: false,
        userExist: false,
        userCreated: true,
        fullNameError: '',
        passwordError: '',
        phoneError: '',
        emailError: '',
      })

      // SAVE VALUES OF USER TO DATABASE
      let user = {
        fullname: state.fullName,
        username: state.username,
        phoneNumber: state.phoneNr,
        email: state.email,
        password: state.password,
      }

      fetch('http://localhost:9000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(user),
      })
          .then((res) => res.json())
          .catch((err) => {
            console.log('[ERROR]', err)
          })
          .then((res) => {
            console.log('register response: ', res)
            if (res.success === true) {
              // alert('You are registered!')
              // let userCreated = true
              // props.history.push("/login", userCreated);

              checkLogin(user.username, user.password, props.history, context)

              setState({...state, userExist: false})
            } else if (res.error === 'user already exist') {
              setState({...state, userExist: true})
            }
          })
    }
  }

  return (
      <form className="register-box">
        <div style={{width: '13rem', display: 'flex', alignItems: 'center'}}>
          <PersonAddIcon fontSize="large" color="secondary"/>
          <span
              style={{
                fontSize: '3rem',
                fontWeight: '800',
                marginLeft: '0.4rem',
              }}
          >
            <img src={logo} alt="Logo" style={{height: '2.1rem'}}/>
          </span>
        </div>
        {state.userExist === true ? (
            <div className="userExists-div">User already exists</div>
        ) : (
            <></>
        )}
        <TextField
            id="fullName"
            onChange={change}
            name="fullName"
            value={state.fullName}
            size="small"
            label="Full name"
            variant="outlined"
            helperText={state.fullNameError}
        />
        <TextField
            id="username"
            onChange={change}
            name="username"
            value={state.username}
            size="small"
            label="Username"
            variant="outlined"
        />
        <TextField
            id="email"
            onChange={change}
            name="email"
            value={state.email}
            size="small"
            label="Email"
            variant="outlined"
            helperText={state.emailError}
        />
        <TextField
            id="phoneNr"
            onChange={change}
            name="phoneNr"
            value={state.phoneNr}
            size="small"
            label="Phonenumber"
            variant="outlined"
            helperText={state.phoneError}
        />
        <TextField
            id="password"
            type="password"
            onChange={change}
            name="password"
            value={state.password}
            size="small"
            label="Password"
            variant="outlined"
            helperText={state.passwordError}
        />
        <TextField
            type="password"
            onChange={change}
            name="confirmPassword"
            value={state.confirmPassword}
            size="small"
            label="Confirm Password"
            variant="outlined"
            helperText={state.passwordError}
        />
        <Button
            size="medium"
            id="login-btn"
            variant="contained"
            color="secondary"
            onClick={submit}
        >
          REGISTER
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
  )
}

export default RegisterForm
