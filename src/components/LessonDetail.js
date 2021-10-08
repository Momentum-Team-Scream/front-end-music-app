import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/lessonDetail.css';
import userEvent from '@testing-library/user-event';
import { AssignmentForm } from './AssignmentForm.js';


export const LessonDetail = ({ auth, props, pk }) => {
  const [lesson, setLesson] = useState({});
  const [note, setNote] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if(auth || submitted) {
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
          setLesson(response.data);
          setNote(response.data.note);
        });
    }
    getLesson();
    setSubmitted(false);
  }}, [props, auth, submitted, pk]);

  return (
    <>
    <div className="lessonDetails">
        <div className="lessonCardCont">
          <div className="lessonDetailHeader">
            <p> {lesson.student}'s lesson' on {lesson.lesson_date} </p>
            <a onClick={() => {
                    window.open("https://meet.jit.si/AllegedOrangesPlayImpolitely");
                }}
                >
                <button type="button" className="btn lsnbtn btn-dark">
                    Start Lesson
                </button>
            </a>
            <a
                href
                onClick={() => {
                    window.open("/mydocs");
                }}
                >
                <button type="button" className="btn docbtn btn-dark">
                    Add doc
                </button>
            </a>
          </div>
          <div className="lessonNotes">
            <div className="planningNote">
                <h4>Lesson Plan</h4>
                <div className="plan">
                    {lesson.plan}
                </div>
            </div>
            <div className="studentAssignment">
                <h4>Student Assignment</h4>
                <div className="assignment">
                    
                    {lesson.note && !!lesson.note.length ?
                        String(lesson.note[0].body)
                        :
                        <>
                        <AssignmentForm auth={auth} setSubmitted={setSubmitted}/> 
                        </>
                     }
                </div>
            </div>
          </div>
        </div>
    </div>
    </>
  );
};
