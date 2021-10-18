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
      <div className="card">
        <form
          onSubmit={(event) => {
            handleEdit(event);
          }}
        >
          <div class="form-group">
            <textarea
              class="form-control"
              defaultValue={lesson.plan}
              onChange={(e) => setPlan(e.target.value)}
              rows={5}
            ></textarea>
          </div>
          <div className="card-footer">
            <button
              className="btn detbtn btn-general"
              id={lesson.pk}
              onClick={(e) => {
                handleEdit(e);
              }}
            >
              Save Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
