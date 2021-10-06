import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/lessonDetail.css';


export const LessonDetail = ({ auth, props, pk }) => {
  const [lesson, setLesson] = useState({});
  const url = "https://www.zoom.com"
//   const [answers, setAnswers] = useState([]);
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
            <p> {lesson.student}'s lesson' on {lesson.lesson_date} </p>
            <a onClick={() => {
                    window.open("https://www.zoom.com");
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
          <div className="planning-notes">
            {lesson.plan}
          </div>
        </div>
        </div>
    </>
  );
};
