import { useEffect, useState } from 'react';
import axios from 'axios';


export const LessonDetail = ({ token, props, pk }) => {
  const [lesson, setLesson] = useState({});
//   const [answers, setAnswers] = useState([]);
  useEffect(() => {
    async function getLesson() {
      await axios
        .get(
          'https://music-mvp.herokuapp.com/api/lesson/' +
            props.match.params.pk,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `token ${token}`,
            },
          }
        )
        .then((response) => {
          setLesson(response.data);
        });
    }
    getLesson();
  }, [props, token, pk]);

  return (
    <>
      <div className="lessonDetails">
        <div className="lessonCardCont">
          <div className="lessonCard">
            <p className="lessonPlan">this is from lesson detail comp</p>
          </div>
          
          </div>
        </div>
    </>
  );
};
