import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { useState } from 'react';
import { RegisterInstructor } from './components/RegisterInstr';
import { Login } from './components/Login';
import { LessonList } from './components/LessonList.js';
import { LessonDetail } from './components/LessonDetail.js';
import { Navigation } from './components/Navigation.js';
import { StudentList } from './components/StudentList.js';
import { InstrProfile } from './components/InstrProfile.js';
import { RegisterStu } from './components/RegisterStu';
import { StudentDashboard } from './components/StudentDashboard';
import { StudentDetail } from './components/StudentDetail';
import { UploadDocs } from './components/UploadDocs.js';

export const App = () => {
  const [auth, setAuth, authStorageOptions] = useLocalStorageState('auth', '');
  const [instructor, setInstructor, instructorStorageOptions] =
    useLocalStorageState('instructor', false);
  const removeAuth = authStorageOptions['removeItem'];
  const removeInstructor = instructorStorageOptions['removeItem'];
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [modalTitle, setModalTitle] = useState('');


  const clearStorage = () => {
    removeAuth();
    removeInstructor();
  };

  return (
    <Router>
      <div className="App">
        <Navigation
          auth={auth}
          setAuth={setAuth}
          clearStorage={clearStorage}
          instructor={instructor}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              auth && instructor ? (
                <LessonList auth={auth} show={show} setShow={setShow} isLoading={isLoading} setIsLoading={setIsLoading} submitted={submitted} setSubmitted={setSubmitted} modalTitle={modalTitle} setModalTitle={setModalTitle} />
              ) : auth ? (
                <StudentDashboard
                  auth={auth}
                  instructor={instructor}
                  show={show}
                  setShow={setShow}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  modalTitle={modalTitle}
                  setModalTitle={setModalTitle}
                />
              ) : (
                <Redirect to={{ pathname: '/login' }} />
              )
            }
          />
          <Route
            path="/login"
            component={() => (
              <Login
                auth={auth}
                setAuth={setAuth}
                instructor={instructor}
                setInstructor={setInstructor}
              />
            )}
          />
          <Route
            path="/register"
            component={() => (
              <RegisterInstructor
                setAuth={setAuth}
                setInstructor={setInstructor}
              />
            )}
          />
          <Route
            path="/student-invite/:pk"
            component={(pk) => <RegisterStu setAuth={setAuth} props={pk} />}
          />
          <Route
            path="/lessons/:pk"
            component={(pk) => (
              <LessonDetail
                props={pk}
                auth={auth}
                show={show}
                setShow={setShow}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                modalTitle={modalTitle}
                setModalTitle={setModalTitle}
              />
            )}
          />
          <Route
            path="/students"
            component={() => <StudentList auth={auth} setAuth={setAuth} />}
          />
          <Route
            path="/profile"
            component={() => (
              <InstrProfile
                auth={auth}
                setAuth={setAuth}
                instructor={instructor}
              />
            )}
          />
          <Route
            path="/users/:pk"
            component={(pk) => <StudentDetail auth={auth} props={pk} isLoading={isLoading} setIsLoading={setIsLoading} setSubmitted={setSubmitted} show={show} setShow={setShow} modalTitle={modalTitle} setModalTitle={setModalTitle} />}
          />
          <Route
            path="/mydocs"
            component={() => (
              <UploadDocs
                auth={auth}
                instructor={instructor}
                show={show} 
                setShow={setShow} 
                modalTitle={modalTitle} 
                setModalTitle={setModalTitle}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};
