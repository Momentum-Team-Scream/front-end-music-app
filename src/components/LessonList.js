import React, { useState, useEffect }from 'react';
import axios from 'axios'
import { LessonForm } from './LessonForm';
import { Lesson } from './Lesson';
import '../styles/inst.css';


export const LessonList = ({ token }) => {
  const [lessons, setLessons] = useState([]);
  const [submitted, setSubmitted] = useState(false);

//   const [search, setSearch] = useState([]);

  useEffect(() => {
    if (token || submitted) {
      axios
        .get(
          `https://music-mvp.herokuapp.com/api/upcoming/`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `token ${token}`,
            },
          }
        )
        .then((res) => setLessons(res.data));
      setSubmitted(false);
    } else {
      axios
        .get(`https://music-mvp.herokuapp.com/api/upcoming/`)
        .then((res) => setLessons(res.data));
    }
  }, [token, submitted]);
//   const handleSubmit = () => {
//     axios
//       .get(
//         `https://music-mvp.herokuapp.com/api/upcoming/?search=${search}`
//       )
//       .then((res) => { setQuestions(res.data); setSearch('')});
//   };

    return (
        <div>
            <div className="lessonPage">
              <h4>Today is *Date*  </h4>
              <p>Here are your lessons for today:</p>  
              <div className="lessonList">
                {token && <Lesson token={token}
                    setSubmitted={setSubmitted}
                  />}
              </div>
              <div className="lessonForm">
              {token && <LessonForm token={token} setSubmitted={setSubmitted} />}
              </div>
            </div>
        </div>
    );
}
