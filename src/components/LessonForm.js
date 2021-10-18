import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { ConfirmModal } from './ConfirmModal';
import '../styles/studentdash.css';
import { LessonBird } from '../svgComponents/LessonBird';

export const LessonForm = ({ auth, setSubmitted, show, setShow }) => {
  const [lesson_date, setLessonDate] = useState('');
  const [lesson_time, setLessonTime] = useState('');
  const [student, setStudent] = useState('');
  const [plan, setPlan] = useState('');
  const [studentList, setStudentList] = useState([]);
  const [dateErr, setDateErr] = useState(false);
  const [timeErr, setTimeErr] = useState(false);
  const [studentErr, setStudentErr] = useState(false);

  useEffect(() => {
    axios
      .get(`https://music-mvp.herokuapp.com/instructor/studio/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      })
      .then((response) => {
        setStudentList(response.data);
      });
  }, [auth]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setDateErr(false);
    setTimeErr(false);
    setStudentErr(false);
    axios
      .post(
        'https://music-mvp.herokuapp.com/api/lessons/',
        {
          lesson_date: lesson_date,
          lesson_time: lesson_time,
          student: student,
          plan: plan,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          setSubmitted(true);
          setShow(true);
          setLessonDate('');
          setLessonTime('');
          setStudent('');
          setPlan('');
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          const err = error.response.data;
          if (err.lesson_date) {
            setDateErr(true);
          }
          if (err.lesson_time) {
            setTimeErr(true);
          }
          if (err.student) {
            setStudentErr(true);
          }
        }
      });
  };

  const handleChange = (inputType, event) => {
    if (inputType === 'lesson_date') {
      setLessonDate(event.target.value);
    }
    if (inputType === 'lesson_time') {
      setLessonTime(event.target.value);
    }
    if (inputType === 'student') {
      setStudent(event.target.value);
    }
    if (inputType === 'plan') {
      setPlan(event.target.value);
    }
  };

  return (
    <div className="Form-group">
      <ConfirmModal show={show} setShow={setShow} />
      <h4> Create a new lesson here! </h4>
      <Form className="form-lessonForm" onSubmit={handleSubmit} noValidate>
        <label className="label-lesson">Lesson Date: </label>
        {dateErr ? (
          <>
            <div className="error-div">
              <p>Enter an upcoming date in the format MM/DD/YYYY</p>
            </div>
          </>
        ) : null}
        <input
          className="input form-control"
          placeholder="Enter date of lesson"
          type="date"
          value={lesson_date}
          onChange={(e) => handleChange('lesson_date', e)}
        />

        <label className="label-lesson">Lesson Time: </label>
        {timeErr ? (
          <>
            <div className="error-div">
              <p>Enter a lesson time</p>
            </div>
          </>
        ) : null}
        <input
          className="input form-control"
          type="time"
          value={lesson_time}
          onChange={(e) => handleChange('lesson_time', e)}
        />

        <label className="label-lesson">Student:</label>
        {studentErr ? (
          <>
            <div className="error-div">
              <p>Select a student</p>
            </div>
          </>
        ) : null}
        <Form.Control
          required
          as="select"
          defaultValue={''}
          onChange={(e) => handleChange('student', e)}
          className="input form-control"
          name="students"
        >
          <option key="" value={''}>
            click to select student
          </option>
          {studentList.map((student, idx) => (
            <option key={idx} value={student.pk}>
              {student.first_name} {student.last_name}
            </option>
          ))}
        </Form.Control>

        <label className="label-lesson">*optional* Lesson Plan: </label>
        <textarea
          className="input form-control"
          placeholder="Enter lesson plan notes"
          type="text"
          value={plan}
          onChange={(e) => handleChange('plan', e)}
        />

        <div>
          <button className="btn btn-general">Create Lesson</button>
        </div>
      </Form>
      <div className="lessonBird">
        <LessonBird />
      </div>
    </div>
  );
};
