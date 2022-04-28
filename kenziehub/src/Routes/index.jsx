import { Switch, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

import { useEffect, useState } from 'react';

const Routes = () => {
  const [authenticated, setAuthenticated] = useState();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('@KenzieHub :token'));

    if (token) {
      return setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <Switch>
      <Route exact path="/register">
        <Register authenticated={authenticated} />
      </Route>

      <Route path="/login">
        <Login
          setAuthenticated={setAuthenticated}
          authenticated={authenticated}
        />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
    </Switch>
  );
};

export default Routes;
