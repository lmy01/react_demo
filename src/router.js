import React from 'react'
import {
  Router, Route, Switch, Redirect
} from 'react-router-dom'

// 在下面的history属性后调用下面两个参数，即可得到不同的路由模式
// createHashHistory：hash模式
// createBrowserHistory：history模式
import {createHashHistory, createBrowserHistory} from 'history'

import App from './App'
import Login from './views/Login/Login'
import Register from './views/Register/Register'


const BasicRoute = () => (
  <Router history={createBrowserHistory()}>
    <Switch>
      <Route path="/app/:rt" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Redirect from="/" to="/app/dashboard" />
    </Switch>
  </Router>
);

export default BasicRoute


