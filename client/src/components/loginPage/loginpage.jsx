import * as React from 'react'
import {Link} from 'react-router-dom'
import {TextField, Button} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import './loginpage.css'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  checkLogin = () => {
    const data = {
      username: this.state.username,
      password: this.state.password
    }

    fetch('http://localhost:9000/login', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content
      },
      body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => {
          console.log('[ERROR]', err)
        })
        .then(res => {
          console.log('login response: ', res)
          if (res.login === true) {
            alert('You are logged in!')

            // TODO: boys, route to homepage here...............
          }
        })

  }

  render() {
    return (
        <div className="login-box">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <ExitToAppIcon fontSize="large"/>
            <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  marginLeft: '0.4rem',
                }}
            >
              LOGIN
            </span>
          </div>

          {this.props.location.state === true ? (
              <div className="usercreated-div">
                Your user was successfully created.
              </div>
          ) : (
              <></>
          )}

          <TextField size="small" label="Username" variant="outlined" required type="email"
                     onChange={(event) => {
                       this.setState({username: event.target.value})
                     }}
          />
          <TextField size="small" label="Password" variant="outlined" required type="password"
                     onChange={(event) => {
                       this.setState({password: event.target.value})
                     }}
          />
          <Button
              size="medium"
              id="login-btn"
              variant="contained"
              color="secondary"
              onClick={this.checkLogin}
          >
            LOGIN
          </Button>
          <p>
            No account? <Link to="/register">Register</Link>
          </p>
        </div>
    )
  }
}

export default LoginPage
