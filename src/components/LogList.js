import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, Card } from 'react-bootstrap';
import { LogForm } from './LogForm.js';

export const LogList = ({ auth }) => {
  const [students, setStudents] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (auth) {
      axios
        .get(`https://music-mvp.herokuapp.com/instructor/studio/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        })
        .then((res) => {
          setStudents(res.data.students);
          console.log(res.data.students);
        });
      setSubmitted(false);
    }
  }, [auth, submitted]);

  return (
    <>
      <LogForm />
    </>
  );
};
