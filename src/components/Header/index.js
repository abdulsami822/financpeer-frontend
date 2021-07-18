import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const routes = [
  {
    key: 'Upload',
    value: '/',
  },
  {
    key: 'Posts',
    value: '/posts',
  },
]

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    localStorage.removeItem('userDetails')
    history.replace('/login')
  }

  const {history} = props
  const {location} = history
  return (
    <div className="header">
      <nav className="navbar">
        {routes.map(route => {
          const activeClass =
            location.pathname === route.value ? 'active-nav' : ''
          return (
            <Link
              key={route.key}
              to={route.value}
              className={`${activeClass} nav-link`}
            >
              {route.key}
            </Link>
          )
        })}
        <button className="logout-btn" type="button" onClick={logout}>
          Logout
        </button>
      </nav>
    </div>
  )
}

export default withRouter(Header)
