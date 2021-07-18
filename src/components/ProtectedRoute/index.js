/* eslint-disable react/jsx-props-no-spreading */

import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  if (!Cookies.get('jwt_token') || !localStorage.getItem('userDetails')) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
