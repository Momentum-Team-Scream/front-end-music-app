import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { AssignmentList } from './AssignmentList';
import { LogForm } from './LogForm';
import { LogList } from './LogList';
import { Loading } from './Loading';
import { ConfirmModal } from './ConfirmModal';
import { ProfileModal } from './ProfileModal';
import birdnotesleft from '../birds/birdnotesleft.png';
import '../styles/studentdash.css';

export const StudentDashboard = ({ auth, instructor, show, setShow, isLoading, setIsLoading, modalTitle, setModalTitle }) => {
  const [user, setUser] = useState('');
  const [toggle, setToggle] = useState(false)
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
      <ProfileModal auth={auth} user={user} instructor={instructor} setShow={setShow} toggle={toggle} setToggle={setToggle} setModalTitle={setModalTitle}/>
      <ConfirmModal show={show} setShow={setShow} modalTitle={modalTitle}/>
      <header className="dash-header">
        <div className="name-edit-links">
          <h2>
            {user.first_name} {user.last_name}
          </h2>
            <a className="header-a" onClick={() => setToggle(true)}>Edit Info</a>
        </div>
        <div className="student-info">
          <div className="">
            <p>
              <i class="bi bi-person-circle general"></i> {user.username}
            </p>
            <p>
              <i class="bi bi-envelope-fill general"></i> {user.email}
            </p>
          </div>
          <img className="bird-student" src={birdnotesleft} alt="bird"></img>
        </div>
      </header>
      <div className="dash-body col-xxl-12 row flex-lg-row-reverse justify-content-center">
        <div className="body-item col-lg-6">
          <LogForm auth={auth} show={show} setShow={setShow} setModalTitle={setModalTitle} />
          <LogList auth={auth} setShow={setShow}/>
        </div>
        <div className="body-item col-lg-6">
          <AssignmentList auth={auth} />
        </div>
      </div>
    </>
  );
};
