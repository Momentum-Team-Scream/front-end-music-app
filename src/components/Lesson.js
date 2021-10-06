// import { Link } from 'react-router-dom';
// import { useState } from 'react';
import axios from 'axios';

export const Lesson = ({ lesson, auth, setSubmitted }) => {
    //   const id = event.target.id;
    //   return axios
    //     .delete(
    //       `https://music-mvp.herokuapp.com/api/lesson/${id}`,
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: `token ${token}`,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       setSubmitted(true);
    //     });
    // }
    return (
        <div className="card">
            <p>{lesson.student}</p>
            <p>{lesson.lesson_date}</p>
            <p>{lesson.lesson_time}</p>
            <p>{lesson.plan}</p>
        </div>
    );
    }
