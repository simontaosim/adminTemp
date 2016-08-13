import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import NotFound from '../components/NotFound';
import Layout from '../components/Layouts/Layout';
import Login from '../components/Login';
import Reg from '../components/Reg';
import DashBoard from '../components/DashBoard';
import Users from '../components/Users';
import Roles from '../components/Roles';

const Routes = ({ location }) =>
  <Router history={hashHistory}>
    <Route path="/" component={Layout} >
      <IndexRoute component={DashBoard} />
      <Route path="users" component={Users}/>
      <Route path="roles" component={Roles}/>
    </Route>
    <Route path="login" component={Login}/>
    <Route path="reg" component={Reg}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
