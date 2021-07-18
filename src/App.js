import {Switch, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Posts from './components/Posts'
import Home from './components/Home'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <ProtectedRoute exact path="/posts" component={Posts} />
    <ProtectedRoute exact path="/" component={Home} />
  </Switch>
)

export default App
