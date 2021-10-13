import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/lessonForm.css';
import { Form } from 'react-bootstrap';


export const LessonForm = ({ auth, setSubmitted }) => {
    const [lesson_date, setLessonDate] = useState('');
    const [lesson_time, setLessonTime] = useState('');
    const [student, setStudent] = useState('');
    const [plan, setPlan] = useState('');
    const [studentList, setStudentList] = useState([]);
  
    // const getStudentList = () => {
      useEffect(() => {
    axios.get(`https://music-mvp.herokuapp.com/instructor/studio/`, 
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `token ${auth}`,
                },
              }
              )
              .then((response) => {
                console.log(response)
                setStudentList(response.data.students);
                console.log(studentList)
                }
              )
      }, [auth])
    

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

          // axios.get(`https://music-mvp.herokuapp.com/instructor/studio/`, 
          //     {
          //       headers: {
          //         'Content-Type': 'application/json',
          //         Authorization: `token ${auth}`,
          //       },
          //     }
          //     )
          //     .then((response) => {
          //       console.log(response)
          //       setStudentList(response.data.students);
          //       console.log(studentList)
          //       }
          //     )

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
      <div className="Form-group">
        
        <h4> Create a new lesson here! </h4>
        <Form className="form-lessonForm" onSubmit={handleSubmit}>
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

            <label className="label">Student:</label>
            <Form.Control required as="select" onChange={(e) => handleChange('student', e)}
              className="input form-control" name="students">
                {studentList.map((student, idx) => (<option key={idx} value={student.pk}>{student.first_name} {student.last_name}</option>))}
            </Form.Control>

          <label className="label">Plan</label>
            <input
              className="input form-control"
              placeholder="Enter lesson plan notes"
              type="text"
              value={plan}
              onChange={(e) => handleChange('plan', e)}
            />
          <div>
            <button className="btn btn-dark">Create Lesson</button>
          </div>
        </Form>
      </div>
    );
  };