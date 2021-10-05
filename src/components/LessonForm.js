import { useState } from 'react';
import axios from 'axios';


export const LessonForm = ({ token, setSubmitted }) => {
    const [lesson_date, setLessonDate] = useState('');
    const [lesson_time, setLessonTime] = useState('');
    const [student, setStudent] = useState('');
    const [plan, setPlan] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios
        .post(
          'https://music-mvp.herokuapp.com/api/lesson/add',
          {
            lesson_date: lesson_date,
            lesson_time: lesson_time,
            student: student,
            plan: plan,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `token ${token}`,
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
        <form className="lessonForm" onSubmit={handleSubmit}>
          <label className="uk-form-label">Lesson Date: </label>
            <input
              placeholder="Enter date of lesson"
              type="date"
              value={lesson_date}
              onChange={(e) => handleChange('lesson_date', e)}
            />
            
          <label className="uk-form-label">Lesson Time: </label>
            <input
            type="time"
            value={lesson_time}
            onChange={(e) => handleChange('lesson_time', e)}
          />  
          <label className="uk-form-label">Student</label>
            <input
              placeholder="Enter student"
              type="text"
              value={student}
              onChange={(e) => handleChange('student', e)}
            />
          <label className="uk-form-label">Plan</label>
            <input
              placeholder="Enter lesson plan notes"
              type="text"
              value={plan}
              onChange={(e) => handleChange('plan', e)}
            />
          <div className="button">
            <button className="uk-button">Create Lesson</button>
          </div>
        </form>
      </div>
    );
  };