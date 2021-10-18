import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { AssignmentForm } from './AssignmentForm.js';
import { EditAssignment } from './EditAssignment.js';
import { EditLessonPlan } from './EditLessonPlan.js';
import { Loading } from './Loading';
import '../styles/studentdash.css';


export const LessonDetail = ({ auth, props, pk, show, setShow, isLoading, setIsLoading }) => {
  const [lesson, setLesson] = useState({});
  const [previous, setPrevious] = useState({});
  useEffect(() => {
    async function getLesson() {
      await axios
        .get(
          'https://music-mvp.herokuapp.com/api/lessons/' +
            props.match.params.pk,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `token ${auth}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setLesson(response.data);
          console.log(lesson);

          if (response.status === 200) {
            console.log('making new request');
            axios
              .get(
                `https://music-mvp.herokuapp.com/api/assignments/${response.data.student}/previous/${response.data.pk}`,

                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${auth}`,
                  },
                }
              )
              .then((response) => {
                setIsLoading(false)
                console.log(response.data);
                setPrevious(response.data[1]);
                console.log(previous);
              });
          }
        });
    }
    getLesson();
  }, [props, auth, pk]);

  return isLoading ? (
    <>
        <Loading />
    </>
    ) :(
    <>
      <header className="dash-header">
        <h2> {lesson.student_name}'s lesson</h2>{' '}
        <h4>
          {lesson.lesson_date} at {lesson.lesson_time}{' '}
        </h4>
        <div className="buttonCont">
          {/* <a
            onClick={() => {
              window.open('https://meet.jit.si/AllegedOrangesPlayImpolitely');
            }}
          >
            <button type="button" className="btn detbtn btn-general">
              Start Lesson
            </button>
          </a> */}
        </div>
      </header>
      <div className="dash-body col-xxl-12 row flex-lg-row justify-content-center">
        <div className="body-item col-lg-6">
          <div className="plan">
            <EditLessonPlan auth={auth} lesson={lesson} show={show} setShow={setShow} />
          </div>
        </div>

        <div className="body-item col-lg-6">
          <div className="assignment">
            {lesson.note && !!lesson.note.length ? (
              String(lesson.note[0].body) && (
                <EditAssignment
                  auth={auth}
                  pk={lesson.pk}
                  note={lesson.note[0].body}
                  noteId={lesson.note[0].pk}
                  show={show}
                  setShow={setShow}
                />
              )
            ) : (
              <>
                <AssignmentForm auth={auth} />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="dash-body col-xxl-12 row flex-lg-row justify-content-center">
        <div className="body-item col-lg-6">
          <p> Notes from last lesson on {previous.lesson_date} </p>
          <div className="prevLsn">
            <div className="card">
              <p className="lessonTxt">{previous.plan}</p>
            </div>
          </div>
        </div>
        <div className="body-item col-lg-6">
          <p> Assignment from last lesson on {previous.lesson_date} </p>
          <div className="prevAssign">
            {previous.note && previous.note.length ? (
              <div className="card">
                <p className="lessonTxt">{previous.note[0].body}</p>
              </div>
            ) : (
              <p>no previous assignment exists</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
