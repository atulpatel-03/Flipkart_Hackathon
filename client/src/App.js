import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './component/auth/Register';
import { LOGOUT } from './redux/actions/types';

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
          <Register />
          <Switch>
            {/* <Route exact path="/" component={Landing} />
            <Route component={Routes} /> */}
            
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
