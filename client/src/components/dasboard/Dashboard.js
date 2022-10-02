import React, { Fragment, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile,
}) => {
  const [pro, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setProfile(profile?.profile);
      setLoading(profile?.loading);
    }
  }, [profile]);

  return loading && pro === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {pro !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.profile.experience} />
          <Education education={profile.profile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i>
              Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProp = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProp, { getCurrentProfile, deleteAccount })(
  Dashboard
);
