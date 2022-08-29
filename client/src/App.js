import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { Login } from './components/auth/Login';
import Alert from './components/layout/Alert';
import { Register } from './components/auth/Register';
import Dashboard from './components/dasboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import React, { Fragment, useEffect } from 'react';
//redux
import { Provider, useSelector } from 'react-redux';
import store from './store';
import { loadUser, login, register } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { setAlert } from './actions/alert';

if (localStorage.token) {
  setAuthToken(localStorage.token);
} else {
  <Navigate to={'/login'} />;
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  const authenticatedRoutes = [{ url: '/dashboard', component: <Dashboard /> }];
  const unAuthenticatedRoutes = [
    { url: '/', component: <Landing /> },
    {
      url: '/register',
      component: <Register register={register} setAlert={setAlert} />,
    },
    { url: '/login', component: <Login login={login} /> },
  ];

  return (
    <Router>
      <Fragment>
        <Navbar />
        <section className='container'>
          <Alert />
          <Routes>
            {isAuthenticated ? (
              <>
                {authenticatedRoutes.map((data, i) => (
                  <Route
                    key={i}
                    exact
                    path={`/${data.url}`}
                    element={data.component}
                  />
                ))}
              </>
            ) : (
              unAuthenticatedRoutes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  element={data.component}
                />
              ))
            )}
          </Routes>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
