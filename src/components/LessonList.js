import React, { useState, useEffect }from 'react';
import axios from 'axios'
import { LessonForm } from './LessonForm';
import { Lesson } from './Lesson';
import '../styles/inst.css';


export const LessonList = ({ auth }) => {
  const [lessons, setLessons] = useState([]);
  const [submitted, setSubmitted] = useState(false);

//   const [search, setSearch] = useState([]);

  useEffect(() => {
    if (auth || submitted) {
      axios
        .get(
          `https://music-mvp.herokuapp.com/api/upcoming/`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `token ${auth}`,
            },
          }
        )
        .then((res) => setLessons(res.data));
      setSubmitted(false);
    } 
    // else {
    //   axios
    //     .get(`https://music-mvp.herokuapp.com/api/upcoming/`)
    //     .then((res) => setLessons(res.data));
    // }
  }, [auth, submitted]);
//   const handleSubmit = () => {
//     axios
//       .get(
//         `https://music-mvp.herokuapp.com/api/upcoming/?search=${search}`
//       )
//       .then((res) => { setQuestions(res.data); setSearch('')});
//   };

    return (
        <div>
            <div className="instPage">
              <div className="lessonList">
                <h4>Today is *Date*  </h4>
                <p>Here are your lessons for today:</p>  
                {lessons.map((lesson, index) => (
                  <div className="lessonCard" key={index}> {auth && <Lesson lesson={lesson} auth={auth} setSubmitted={setSubmitted}/>}</div>
                ))}
              </div>
              <div className="lessonForm">
              {auth && <LessonForm auth={auth} setSubmitted={setSubmitted} />}
              </div>
            </div>
        </div>
    );
}
