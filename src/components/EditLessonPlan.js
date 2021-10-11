import { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import axios from 'axios';


export const EditLessonPlan = ({ auth, lesson }) => {
  const history = useHistory();
  const [lessonPk] = useState(lesson.pk)
  const [lessonDate, setLessonDate] = useState(lesson.lesson_date);
  const [lessonTime, setLessonTime] = useState(lesson.lesson_time);
  const [plan, setPlan] = useState(lesson.plan);
  const [student, setStudent] = useState(lesson.student);
  const [author, setAuthor] = useState(lesson.author);


    
  const handleEdit = (event) => {
    const id = event.target.id;
    console.log (id)
    event.preventDefault();
    axios.patch(
        `https://music-mvp.herokuapp.com/api/lessons/${id}/`,
        {   lesson_date: lessonDate ,
            lesson_time: lessonTime,
            plan: plan,
        },

      {    headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      }
    )
    .then((res) => {
        // setLessonDate('');
        // setLessonTime('');
        setPlan('');
        history.push(`/lessons/${id}/`);
      });
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleEdit(event);
        }}
      >
        <div class="form-group">
          <label>Update lesson below</label>
          <input
            type="text"
            class="form-control"
            defaultValue={lesson.plan}
            onChange={(e) => setPlan(e.target.value)}
          />
        </div>
        
        <button className="editButton btn btn-outline-secondary"
                id={lesson.pk}
                onClick={(e) => { handleEdit(e)}}
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                >
                    Save Update
                </button>


        {/* <button class="btn btn-secondary" type="submit" onClick={handleEdit}>
          Save
        </button> */}
      </form>
    </div>
  );
};