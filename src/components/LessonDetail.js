import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/lessonDetail.css';
import userEvent from '@testing-library/user-event';
import { AssignmentForm } from './AssignmentForm.js';
import {EditAssignment } from './EditAssignment.js';
import { EditLessonPlan } from './EditLessonPlan.js';

export const LessonDetail = ({ auth, props, pk }) => {
  const [lesson, setLesson] = useState({});
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
          setLesson(response.data);
        });
    }
    getLesson();
  }, [props, auth, pk]);


  return (
    <>
      <div className="lessonDetails">
        <div className="lessonCardCont">
          <div className="lessonDetailHeader">
            <h4> {lesson.student}'s lesson
              <br /> on {lesson.lesson_date} 
            </h4>
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
                window.open('/mydocs');
              }}
            >
              <button type="button" className="btn docbtn btn-dark">
                Add doc
              </button>
            </a>
          </div>
          <div className="lessonNotes">
            <div className="planningNote">
                <div div clasName="cardheader">
                  <h4>Lesson Plan</h4>
                  <p> (click below to edit) </p>
                </div>
              <div className="plan">
                <EditLessonPlan auth={auth} lesson={lesson} />
              </div>
            </div>
            <div className="studentAssignment">
                <div clasName="cardheader">
                  <h4>Student Assignment</h4>
                  <p> (click below to edit) </p>
                </div>
                
                <div className="assignment">
                
                    {lesson.note && !!lesson.note.length ?
                        String(lesson.note[0].body)  
                        &&
                        <EditAssignment auth={auth} pk={lesson.pk} note={lesson.note[0].body} noteId={lesson.note[0].pk} />
                        :
                        <>
                          <AssignmentForm auth={auth} /> 
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
