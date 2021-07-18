import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
    isLoading: false,
  }

  renderButton = () => {
    const {isLoading} = this.state
    return isLoading ? (
      <button type="submit" className="login-btn" disabled>
        <Loader type="TailSpin" height={28} color="#fff" />
      </button>
    ) : (
      <button type="submit" className="login-btn">
        Sign up
      </button>
    )
  }

  registerSuccess = () => {
    const {history} = this.props
    history.replace('/login')
  }

  registerFailure = data => {
    this.setState({errorMessage: data.error_msg})
  }

  submitForm = async e => {
    e.preventDefault()
    this.setState({errorMessage: ''})
    const {username, email, password, confirmPassword} = this.state
    if (!username || !email || !password || !confirmPassword) {
      this.setState({errorMessage: '*Enter valid credentials'})
    } else if (password !== confirmPassword) {
      this.setState({errorMessage: 'passwords must match'})
    } else if (password.length < 6) {
      this.setState({
        errorMessage: 'password must be greater than 6 characters',
      })
    } else {
      this.setState({isLoading: true})
      const url = 'https://financepeer-node.herokuapp.com/user/register'
      const body = {username, email, password, confirmPassword}
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }

      const response = await fetch(url, options)
      const data = await response.json()
      this.setState({isLoading: false})
      if (response.ok === true) {
        this.registerSuccess()
      } else {
        this.registerFailure(data)
      }
    }
  }

  render() {
    if (Cookies.get('jwt_token') && localStorage.getItem('userDetails')) {
      return <Redirect to="/" />
    }
    const {
      username,
      email,
      password,
      confirmPassword,
      errorMessage,
    } = this.state
    return (
      <div className="bg">
        <div className="content register-content">
          <div className="section">
            <form className="form" onSubmit={this.submitForm}>
              <h1 className="main-heading">Sign Up</h1>
              <div className="input-container">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={e => {
                    this.setState({username: e.target.value})
                  }}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => {
                    this.setState({email: e.target.value})
                  }}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => {
                    this.setState({password: e.target.value})
                  }}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={e => {
                    this.setState({confirmPassword: e.target.value})
                  }}
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              {this.renderButton()}
              <Link to="/login" className="no-account">
                I already have an account
              </Link>
            </form>
          </div>
          <div className="form-img-container">
            <img src="/img/register.svg" className="form-img" alt="register" />
          </div>
        </div>
      </div>
    )
  }
}

export default Register
