import React, { useState, useEffect }from 'react';
import axios from 'axios'
import { LessonForm } from './LessonForm'


export const LessonList = ({ token, username }) => {
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
            <div>
              <h4>instructor main page</h4>
            </div>
            <div>
            {token && <LessonForm token={token} setSubmitted={setSubmitted} />}
            </div>
        </div>
    );
}

