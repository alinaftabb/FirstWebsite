import axios from 'axios';
// import { setAlert, SetAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    console.log('Data:', res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.StatusText, status: err.response.status },
    });
  }
};

// //create or update a profile
export const createProfile =
  (FormData, cb, edit = false) =>
  async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/profile', FormData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      // dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

      if (!edit) {
        console.log('cb2');
        if (cb) cb();
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        // errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.StatusText, status: err.response.status },
      });
    }
  };

//Add experience
export const addExperience = (FormData, cb) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/experience', FormData, config);
    console.log('exp: ', res.data);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

    if (cb) cb();
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      // errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.StatusText, status: err.response.status },
    });
  }
};

//Add Educatio
export const addEducation = (FormData, cb) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/education', FormData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

    if (cb) cb();
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      // errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.StatusText, status: err.response.status },
    });
  }
};
