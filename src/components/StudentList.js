import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Table, Card, Button, Container, Form } from 'react-bootstrap';
import { EmailFormModal } from './EmailFormModal.js';
import { ConfirmModal } from './ConfirmModal.js';
import '../styles/StudentList.css';
import '../styles/docs.css';
import '../styles/login.css';
import _ from 'lodash';
import { StudioBirds } from '../svgComponents/StudioBirds';

export const StudentList = ({ auth, show, setShow, modalTitle, setModalTitle }) => {
  const [students, setStudents] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState([]);
  const [instructorid, setInstructorid] = useState()
    const [toggle, setToggle] = useState(false)
  const history = useHistory();
  
  
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
          setInstructorid(res.data[0].instructor);

        });
      setSubmitted(false);
    }
  }, [auth, submitted]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://music-mvp.herokuapp.com/instructor/studio/?search=${search}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        }
      )
      .then((res) => {
        setStudents(res.data);
        setSearch('');
      });
  };

  const handleChange = (inputType, event) => {
    if (inputType === 'search') {
      setSearch(event.target.value);
    }
  };

  const handleRemove = (pk) => {
    axios.patch(
      `https://music-mvp.herokuapp.com/instructor/studio/${pk}/`,
      {
        active_in_studio: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      }
    );
  };

  return (
    <>
      <Container>
        <div className="studioCont">
        <div>
            <ConfirmModal show={show} setShow={setShow} modalTitle={modalTitle} />
            <button className="btn btn-general" onClick={() => setToggle(!toggle)}>
                Add new student
            </button>
            <EmailFormModal auth={auth} pk={instructorid} setSubmitted={setSubmitted} setShow={setShow} toggle={toggle} setToggle={setToggle} setModalTitle={setModalTitle}/>
        </div>
        <h1 className="musicTitle">Your Studio</h1>
          <div className="studioBird">
            <StudioBirds />
          </div>
        </div>
        <div className="StudentCont">
          <div className="searchBarCont">
            <Form className="form-studentSearchForm" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="studentSearchForm">
                <Form.Label>
                  <h4>Search for a student</h4>
                </Form.Label>
                <Form.Control
                  input="text"
                  placeholder="enter student name here"
                  className="input form-control"
                  value={search}
                  onChange={(e) => handleChange('search', e)}
                ></Form.Control>
                <div>
                  <button className="btn btn-general" type="submit">
                    Search
                  </button>
                </div>
              </Form.Group>
            </Form>
          </div>

          <Table responsive="sm">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Username</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Student Since</th>
                <th scope="col">Remove from Studio</th>
              </tr>
            </thead>
            <tbody>
              {students && !_.isEmpty(students) ? (
                students.map((student, index) => {
                  return (
                    <tr>
                      <td>
                        <Link to={`/users/${student.pk}`}>
                          {student.first_name}
                        </Link>
                      </td>
                      <td>{student.last_name}</td>
                      <td>{student.username}</td>
                      <td>{student.phone}</td>
                      <td>{student.email}</td>
                      <td>{student.created_at}</td>
                      <td>
                        <button
                          className="delButton btn btn-destroy docdel"
                          id={student.pk}
                          onClick={(e) => {
                            if (
                              window.confirm(
                                'Are you sure you want to remove this student?'
                              )
                            )
                              handleRemove(student.pk);
                            history.go(0);
                          }}
                        >
                          Remove Student
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div>
                  <h4>No results found for that search</h4>
                  <div>
                    <button className="btn .btn-general" onClick={handleSubmit}>
                      return to student list
                    </button>
                  </div>
                </div>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
