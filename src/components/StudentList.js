import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import '../styles/StudentList.css';

export const StudentList = ({ auth }) => {
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
      <p>Your Students</p>
      <div className="StudentCont">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr>
                <td>{index}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
