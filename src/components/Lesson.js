import { Link } from 'react-router-dom';
import axios from 'axios';

export const Lesson = ({ lesson, auth, setSubmitted }) => {
  const handleDelete = (event) => {
    const id = event.target.id;
    return axios
      .delete(`https://music-mvp.herokuapp.com/api/lessons/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      })
      .then((res) => {
        setSubmitted(true);
      });
  };

  return (
    <div className="card" key={lesson.pk}>
      <p>{lesson.student_name}</p>
      <p>{lesson.lesson_date}</p>
      <p>{lesson.lesson_time}</p>
      <p>{lesson.plan}</p>
      <div className="card-footer">
        <Link to={`/lessons/${lesson.pk}`}>
          <button className="btn detbtn btn-general">Details</button>
        </Link>
        <button
          className="delButton btn btn-destroy"
          id={lesson.pk}
          onClick={(e) => {
            if (window.confirm('Are you sure you want to delete this lesson?'))
              handleDelete(e);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

