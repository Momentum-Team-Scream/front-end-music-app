import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { AssignmentList } from './AssignmentList';
import { LogForm } from './LogForm';
import { LogList } from './LogList';
import { Loading } from './Loading';
import birdnotesleft from '../birds/birdnotesleft.png';
import '../styles/studentdash.css';

export const StudentDashboard = ({ auth, show, setShow, isLoading, setIsLoading }) => {
  const [user, setUser] = useState('');
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;

    axios
      .get('https://music-mvp.herokuapp.com/auth/users/me/', {
        headers: {
          Authorization: `token ${auth}`,
        },
      })
      .then((res) => {
        if (isMounted) {
          if (res.status === 200) {
            console.log(res.data);
            setUser(res.data);
            setIsLoading(false)
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return isLoading ? (
    <>
        <Loading />
    </>
    ) : (
    <>
      <header className="dash-header">
        <div className="name-edit-links">
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <Link to="/profile">
            <p>Edit Info</p>
          </Link>
          <button type="button" class="ms-auto stu-dash-btn btn btn-gray">
            Contact Instructor
          </button>
        </div>
        <div className="student-info">
          <div className="">
            <p>
              <i class="bi bi-person-circle general"></i> {user.username}
            </p>
            <p>
              <i class="bi bi-envelope-fill general"></i> {user.email}
            </p>
            <p>Emergency Contact: {user.emergency_contact_name}</p>
            <p>Emergency Phone: {user.emergency_contact_phone}</p>
          </div>
        </div>
      </header>
      <div className="dash-body col-xxl-12 row flex-lg-row-reverse justify-content-center">
        <div className="body-item col-lg-6">
          <LogForm auth={auth} show={show} setShow={setShow} />
          <LogList auth={auth} />
          <img className="bird" src={birdnotesleft} alt="bird"></img>
        </div>
        <div className="body-item col-lg-6">
          <AssignmentList auth={auth} />
        </div>
      </div>
    </>
  );
};
