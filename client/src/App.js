import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { Login } from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dasboard/Dashboard';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import { Register } from './components/auth/Register';
import Posts from './components/posts/Posts';
import React, { Fragment, useEffect } from 'react';
//redux
import { connect, useSelector } from 'react-redux';
import store from './store';
import { loadUser, login, register } from './actions/auth';
import { getProfileById, getProfiles } from './actions/profile';
import setAuthToken from './utils/setAuthToken';
import { setAlert } from './actions/alert';
import { useNavigate } from 'react-router';

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
  const nav = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      nav('/dashboard');
    }
  }, []);

  const authenticatedRoutes = [
    {
      url: '/dashboard',
      component: <Dashboard />,
    },
    {
      url: '/create-profile',
      component: <CreateProfile />,
    },
    {
      url: '/edit-profile',
      component: <EditProfile />,
    },
    {
      url: '/add-experience',
      component: <AddExperience />,
    },
    {
      url: '/add-education',
      component: <AddEducation />,
    },
    {
      url: '/profiles',
      component: <Profiles />,
    },
    {
      url: '/profile/:id',
      component: <Profile getProfileById={getProfileById} />,
    },
    {
      url: '/posts',
      component: <Posts />,
    },
  ];

  const unAuthenticatedRoutes = [
    { url: '/', component: <Landing /> },
    {
      url: '/register',
      component: <Register register={register} setAlert={setAlert} />,
    },
    { url: '/login', component: <Login login={login} /> },
    { url: '/profiles', component: <Profiles getProfiles={getProfiles} /> },
    {
      url: '/profile/:id',
      component: <Profile getProfileById={getProfileById} />,
    },
  ];

  return (
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
  );
};

export default connect(null, null)(App);
