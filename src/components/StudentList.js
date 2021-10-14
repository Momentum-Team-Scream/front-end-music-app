import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Card, Button, Text } from 'react-bootstrap';
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
      <div className="studentListBody">
        <h1 className="studentTitle">Your Students</h1>
        <div className="StudentCont">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>

                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr>
                  <td>{index}</td>

                  <td>
                    <a href="#">{student.first_name}</a>
                  </td>
                  <td>{student.last_name}</td>
                  <td>{student.username}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
