import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    email: '',
    password: '',
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
        Sign in
      </button>
    )
  }

  loginSuccess = data => {
    const {history} = this.props
    const jwtToken = data.jwt_token
    const {user} = data
    Cookies.set('jwt_token', jwtToken, {
      expires: 7,
    })
    localStorage.setItem('userDetails', JSON.stringify(user))
    history.replace('/')
  }

  loginFailure = data => {
    this.setState({errorMessage: data.error_msg})
  }

  submitForm = async e => {
    e.preventDefault()
    this.setState({errorMessage: ''})
    const {username, email, password} = this.state
    if (!username || !email || !password) {
      this.setState({errorMessage: '*Enter valid credentials'})
    } else {
      this.setState({isLoading: true})
      const url = 'https://financepeer-node.herokuapp.com/user/login'
      const body = {username, email, password}
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
        this.loginSuccess(data)
      } else {
        this.loginFailure(data)
      }
    }
  }

  render() {
    if (Cookies.get('jwt_token') && localStorage.getItem('userDetails')) {
      return <Redirect to="/" />
    }
    const {username, email, password, errorMessage} = this.state
    return (
      <div className="bg">
        <div className="content">
          <div className="section">
            <form className="form" onSubmit={this.submitForm}>
              <h1 className="main-heading">Sign In</h1>
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
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {this.renderButton()}
              <Link to="/register" className="no-account">
                I don&#39;t have an account
              </Link>
            </form>
          </div>
          <div className="form-img-container">
            <img src="/img/login.svg" className="form-img" alt="login" />
          </div>
        </div>
      </div>
    )
  }
}

export default Login
