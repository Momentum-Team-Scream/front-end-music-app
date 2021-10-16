import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Card, Button, Text, Form } from 'react-bootstrap';
// import '../styles/stylesheet.css';
import '../styles/StudentList.css';
import _ from 'lodash';


export const StudentList = ({ auth }) => {
  const [students, setStudents] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState([]);
  
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
          setStudents(res.data);
          console.log(res.data);
        });
      setSubmitted(false);
    }
  }, [auth, submitted]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`${search}`);
    axios
      .get(
        `https://music-mvp.herokuapp.com/instructor/studio/?search=${search}`,
        {headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      })
      .then((res) => {setStudents(res.data); setSearch('')});
  };

  const handleChange = (inputType, event) => {
    if (inputType === 'search') {
      setSearch(event.target.value);
    }
  };

  return (
    <>
      <div className="studentListBody">
        <h1 className="studentTitle">Your Students</h1>
        <div className="StudentCont">

        <div className="searchBarCont">
          {/* <input
            className="searchBar"
            type="text"
            placeholder="search for a student"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}

          <Form className="form-studentSearchForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="studentSearchForm">
              <Form.Label>
                <h4>Search for a student</h4>
                </Form.Label>
              <Form.Control input="text" 
                placeholder="enter student name here" 
                className="input form-control"
                value={search}
                onChange={(e) => handleChange('search', e)} >
                </Form.Control>
                <div>
                <button className="btn btn-general" type="submit">Search</button>
              </div>
            </Form.Group>
              {/* <div>
                <button className="btn btn-general" type="submit">Search</button>
              </div> */}
          </Form>

          {/* <div className="button btn">
            <button className="btn .btn-general" onClick={handleSubmit}>
              Search
            </button>
          </div> */}
        </div>

          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
            {students && !_.isEmpty(students)
          ? students.map((student, index) => {
            return (
                <tr>
                  <td>
                    <Link to={`/users/${student.pk}/`}>
                      {student.first_name}
                    </Link>
                  </td>
                  <td>{student.last_name}</td>
                  <td>{student.username}</td>
                </tr>
                
              );
            })
              :
            <div>
              <h4>
                No results found for that search
              </h4>
              <div>
                <button className="btn .btn-general" onClick={handleSubmit}>
                  return to student list
                </button>
              </div>
            </div>
            }
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
