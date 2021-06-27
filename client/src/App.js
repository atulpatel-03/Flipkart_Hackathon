import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './asserts/scss/index.scss';
import Landing from "./component/layout/Landing";
import Navbar from "./component/layout/Navbar";
import { LOGOUT } from './redux/actions/types';
import Routes from "./component/routing/Routes";
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './redux/actions/auth';
import setAuthToken from './utils/setAuthToken';

function App() {
  useEffect(() => {

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
            
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
