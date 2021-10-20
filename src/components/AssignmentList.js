import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading } from './Loading';

export const AssignmentList = ({ auth }) => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    let isMounted = true;

    await axios
      .get('https://music-mvp.herokuapp.com/api/upcoming/', {
        headers: {
          Authorization: `token ${auth}`,
        },
      })
      .then((res) => {
        if (isMounted) {
          if (res.status === 200) {
            const lessons = res.data;
            let notes = [];
            lessons.forEach((lesson) => {
              if (lesson.note.length >= 1) {
                notes.push(lesson.note[0]);
              }
            });
            setAssignments(notes);
            setIsLoading(false);
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, [auth]);

  return isLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      <h3>Lesson Notes</h3>
      {assignments.map((assign, idx) => {
        return (
          <div className="card card-list" key={idx}>
            <div className="card-header header-gray">{assign.created_at}</div>
            <div className="card-body cd-body">
              <p className="card-title">{assign.body}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
