import { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { ConfirmModal } from './ConfirmModal.js';
import '../styles/studentdash.css';
import axios from 'axios';

export const EditLessonPlan = ({ auth, lesson, show, setShow }) => {
  const history = useHistory();
  const [lessonPk] = useState(lesson.pk);
  const [lessonDate, setLessonDate] = useState(lesson.lesson_date);
  const [lessonTime, setLessonTime] = useState(lesson.lesson_time);
  const [plan, setPlan] = useState(lesson.plan);
  const [student, setStudent] = useState(lesson.student);
  const [author, setAuthor] = useState(lesson.author);

  const handleEdit = (event) => {
    const id = event.target.id;
    console.log(id);
    event.preventDefault();
    axios
      .patch(
        `https://music-mvp.herokuapp.com/api/lessons/${id}/`,
        { lesson_date: lessonDate, lesson_time: lessonTime, plan: plan },

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        }
      )
      .then((res) => {
        if(res.status === 200) {
          setShow(true)
          console.log(show)
          setPlan('');
          history.push(`/lessons/${id}/`);
        }
      });
  };

  return (
    <>
      <ConfirmModal show={show} setShow={setShow} />
      <div className="card lesson-plan">
        <div div className="card-header lesson-plan">
          <h4>Lesson Plan</h4>
        </div>
        <div className="form-group">
          <form
            onSubmit={(event) => {
              handleEdit(event);
            }}
          >
            <textarea
              className="form-control lesson-detail"
              defaultValue={lesson.plan}
              placeholder="Click to edit"
              onChange={(e) => setPlan(e.target.value)}
              rows={5}
            ></textarea>
            <button
              className="btn btn-general lesson-plan"
              id={lesson.pk}
              onClick={(e) => {
                handleEdit(e);
              }}
            >
              Update plan
            </button>
        </form>
      </div>
      </div>

    </>
  );
};
