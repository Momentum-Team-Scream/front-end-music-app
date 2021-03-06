import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AssignmentList } from './AssignmentList';
import { LogForm } from './LogForm';
import { LogList } from './LogList';
import { Loading } from './Loading';
import { ConfirmModal } from './ConfirmModal';
import { ProfileModal } from './ProfileModal';
import '../styles/studentdash.css';
import { Container } from 'react-bootstrap';
import { HeadphonesBird1 } from '../svgComponents/Headphones-bird-1';

export const StudentDashboard = ({
  auth,
  instructor,
  show,
  setShow,
  isLoading,
  setIsLoading,
  modalTitle,
  setModalTitle,
}) => {
  const [user, setUser] = useState('');
  const [toggle, setToggle] = useState(false);

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
            setUser(res.data);
            setIsLoading(false);
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
      <Container>
        <ProfileModal
          auth={auth}
          user={user}
          instructor={instructor}
          setShow={setShow}
          toggle={toggle}
          setToggle={setToggle}
          setModalTitle={setModalTitle}
        />
        <ConfirmModal show={show} setShow={setShow} modalTitle={modalTitle} />
        <header className="dash-header">
          <div className="name-edit-links">
            <h2>
              {user.first_name} {user.last_name}
            </h2>
            <a className="header-a" onClick={() => setToggle(true)}>
              Edit Info
            </a>
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
            <HeadphonesBird1 />
          </div>
        </header>
        <div className="dash-body col-xxl-12 row flex-lg-row-reverse justify-content-center">
          <div className="body-item col-lg-6">
            <LogForm
              auth={auth}
              show={show}
              setShow={setShow}
              setModalTitle={setModalTitle}
            />
            <LogList auth={auth} setShow={setShow} />
          </div>
          <div className="body-item col-lg-6">
            <AssignmentList auth={auth} />
          </div>
        </div>
      </Container>
    </>
  );
};
