import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LessonForm } from './LessonForm';
import { Lesson } from './Lesson';
import { Loading } from './Loading'
import { ConfirmModal } from './ConfirmModal'
import Container from 'react-bootstrap/Container';
import '../styles/studentdash.css';
import { LessonBird } from '../svgComponents/LessonBird';


export const LessonList = ({ auth, show, setShow, isLoading, setIsLoading, submitted, setSubmitted, modalTitle, setModalTitle }) => {
  const [lessons, setLessons] = useState([]);
  const date = useState([new Date()]);
  const today = String(date[0]).slice(0, 16);

  useEffect(() => {
    if (auth || submitted) {
      axios
        .get(`https://music-mvp.herokuapp.com/api/upcoming/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        })
        .then((res) => {
          setLessons(res.data);
          setIsLoading(false)
        });
      setSubmitted(false);
    }
  }, [auth, submitted]);

  return isLoading ? (
    <>
        <Loading />
    </>
    ) :(
    <>
      <ConfirmModal show={show} setShow={setShow} modalTitle={modalTitle} />
      <Container >
        <div className="dash-body col-xxl-12 row flex-lg-row-reverse justify-content-center">
          <div className="body-item col-lg-6">
          <h4> Create a new lesson here! </h4>
            {auth && (
              <LessonForm
                auth={auth}
                setSubmitted={setSubmitted}
                show={show}
                setShow={setShow}
                setModalTitle={setModalTitle}
              />
            )}
            <div className="lessonBird">
              <LessonBird />
            </div>
          </div>
          <div className="body-item col-lg-6">
            <h4>Today is {today}</h4>
            <p>Here are your lessons for today</p>
            {lessons.map((lesson, index) => (
              <div className="lessonCard" key={index}>
                {' '}
                {auth && (
                  <Lesson lesson={lesson} auth={auth} setSubmitted={setSubmitted} />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};
