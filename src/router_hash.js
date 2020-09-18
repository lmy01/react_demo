import React from 'react'
import {
  HashRouter, Route, Switch, hashHistory, Redirect
} from 'react-router-dom'
import App from './App'
import Login from './views/Login/Login'
import Register from './views/Register/Register'


const BasicRoute = () => (
  <HashRouter history>
    <Switch>
      <Route path="/app/:rt" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Redirect from="/" to="/app/dashboard" />
    </Switch>
  </HashRouter>
);

export default BasicRoute
