import { useState } from 'react';
import axios from 'axios';
import '../styles/lessonForm.css';


export const LessonForm = ({ auth, setSubmitted }) => {
    const [lesson_date, setLessonDate] = useState('');
    const [lesson_time, setLessonTime] = useState('');
    const [student, setStudent] = useState('');
    const [plan, setPlan] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
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
          setSubmitted(true);
          setLessonDate('');
          setLessonTime('');
          setStudent('');
          setPlan('');
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
      <div className="form-group">
        <h4> Create a new lesson here! </h4>
        <form className="form-lessonForm" onSubmit={handleSubmit}>
          <label className="label">Lesson Date: </label>
            <input
              className="input form-control"
              placeholder="Enter date of lesson"
              type="date"
              value={lesson_date}
              onChange={(e) => handleChange('lesson_date', e)}
            />
            
          <label className="label">Lesson Time: </label>
            <input
            className="input form-control"
            type="time"
            value={lesson_time}
            onChange={(e) => handleChange('lesson_time', e)}
          />  
          <label className="label">Student</label>
            <input
              className="input form-control"
              placeholder="Enter student"
              type="text"
              value={student}
              onChange={(e) => handleChange('student', e)}
            />
          <label className="label">Plan</label>
            <input
              className="input form-control"
              placeholder="Enter lesson plan notes"
              type="text"
              value={plan}
              onChange={(e) => handleChange('plan', e)}
            />
          <div>
            <button className="btn btn-general">Create Lesson</button>
          </div>
        </form>
      </div>
    );
  };