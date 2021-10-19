import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextTruncate from 'react-text-truncate';
import { Loading } from './Loading';
import { FormModal } from './FormModal';
import { ConfirmModal } from './ConfirmModal';
import '../styles/studetail.css';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export const StudentDetail = ({
  auth,
  props,
  isLoading,
  setIsLoading,
  setSubmitted,
  show,
  setShow,
  modalTitle,
  setModalTitle,
}) => {
  const [student, setStudent] = useState({});
  const [upcomingLessons, setUpcomingLessons] = useState([]);
  const [pastLessons, setPastLessons] = useState([]);
  const [pk, setPk] = useState('');
  const [toggle, setToggle] = useState(false);
  const date = useState([new Date()]);
  const today = String(date[0]).slice(0, 16);
  const history = useHistory();
  useEffect(async () => {
    let isMounted = true;

    const newArr = props.location.pathname.split('/');
    setPk(newArr.pop());
    console.log(pk);

    await axios
      .get(`https://music-mvp.herokuapp.com/api/users/${pk}`, {
        headers: {
          Authorization: `token ${auth}`,
        },
      })
      .then((res) => {
        if (isMounted) {
          if (res.status === 200) {
            setStudent(res.data);
            const pk = res.data.pk;
            return axios
              .get(`https://music-mvp.herokuapp.com/api/assignments/${pk}/`, {
                headers: {
                  Authorization: `token ${auth}`,
                },
              })
              .then((res) => {
                if (isMounted) {
                  if (res.status === 200) {
                    const lessons = res.data;
                    console.log(res.data);
                    let upLessons = [];
                    let paLessons = [];
                    lessons.forEach((lesson) => {
                      let lesDate = lesson.lesson_date;
                      if (Date.parse(lesDate) >= Date.parse(today)) {
                        upLessons.push(lesson);
                      } else paLessons.push(lesson);
                    });
                    setUpcomingLessons(upLessons);
                    setPastLessons(paLessons);
                    setIsLoading(false);
                  }
                }
              });
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, [pk]);
  const handleRemove = (pk) => {
    axios.patch(
      `https://music-mvp.herokuapp.com/instructor/studio/${pk}/`,
      {
        active_in_studio: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      }
    );
  };

  return isLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <Container>
      <div>
        <header className="stu-header">
          <h3>
            {student.first_name} {student.last_name}
          </h3>
          <div className="studentDetailHeaderCont">
            <p>
              <i class="bi bi-person-circle"></i> {student.username}
            </p>
            <p>
              <i class="bi bi-envelope-fill"></i> {student.email}
            </p>
            <p>Emergency Contact: {student.emergency_contact_name}</p>
            <p>Emergency Phone: {student.emergency_contact_phone}</p>

            <button
              className="delButton btn btn-destroy studentRemove"
              id={student.pk}
              onClick={(e) => {
                if (
                  window.confirm(
                    'Are you sure you want to remove this student?'
                  )
                )
                  handleRemove(student.pk);
                history.push(`/students`);
                history.go(0);
              }}
            >
              Remove Student
            </button>
          </div>
        </header>
        <body className="stu-body col-xxl-12 row flex-lg-row justify-content-center">
          <div className="body-item col-lg-6">
            <h3>Upcoming Lessons</h3>
            {upcomingLessons.map((lesson, idx) => {
              return (
                <>
                  <div className="card" key={idx}>
                    <div className="card-header alert">
                      {lesson.plan ? (
                        <TextTruncate
                          line={1}
                          element="span"
                          truncateText="…"
                          text={lesson.plan}
                        />
                      ) : (
                        <p className="empty-p">No plan added...</p>
                      )}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{lesson.lesson_date}</h5>
                      <Link to={`/lessons/${lesson.pk}`}>
                        <button className="btn btn-gray">
                          Edit Lesson Plan
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="body-item col-lg-6">
            <div className="add-lesson-div">
              <h3>Today is {today}</h3>
              <div>
                <ConfirmModal
                  show={show}
                  setShow={setShow}
                  modalTitle={modalTitle}
                />
                <button
                  className="btn btn-general"
                  onClick={() => setToggle(!toggle)}
                >
                  Create New Lesson
                </button>
                <FormModal
                  auth={auth}
                  setSubmitted={setSubmitted}
                  setShow={setShow}
                  toggle={toggle}
                  setToggle={setToggle}
                  setModalTitle={setModalTitle}
                />
              </div>
            </div>
            <div>
              <h3>Past Lesson Plans:</h3>
              {pastLessons.map((plesson, idx) => {
                return (
                  <div className="card" key={idx}>
                    <div className="card-header">
                      <p>{plesson.lesson_date}</p>
                    </div>
                    <div className="card-body">
                      {plesson.plan ? (
                        <p>{plesson.plan}</p>
                      ) : (
                        <p className="empty-p">No plan added...</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </body>
      </div>
    </Container>
  );
};
