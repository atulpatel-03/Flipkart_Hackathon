import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import Future from "../dashboard/Future";
import History from "../dashboard/History";
import Logout from '../dashboard/Logout';
import Mailform from '../dashboard/Mailform';
const Routes = props => {
    return (
      <section className="fluid-container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/futuremail" component={Future} />
          <PrivateRoute exact path="/historymail" component={History} />
          <PrivateRoute exact path="/mailform" component={Mailform} />
          <PrivateRoute exact path="/logout" component={Logout} />
        </Switch>
      </section>
    );
  };
  
  export default Routes;