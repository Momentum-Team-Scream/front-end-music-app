import axios from 'axios';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Doc } from './Doc.js';
import '../styles/StudentList.css';
import { Dropdown, Table, Container, Form } from 'react-bootstrap';

export const DocList = ({ auth, studentList, instructor }) => {
  const [docs, setDocs] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    if (auth || submitted) {
      axios
        .get(`https://music-mvp.herokuapp.com/api/documents/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        })
        .then((res) => {
          setDocs(res.data);
        });
      setSubmitted(false);
    }
  }, [auth, submitted]);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://music-mvp.herokuapp.com/api/documents/?search=${search}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        }
      )
      .then((res) => {
        setDocs(res.data);
        setSearch('');
      });
  };

  const handleChange = (inputType, event) => {
    if (inputType === 'search') {
      setSearch(event.target.value);
    }
  };
  
  
  return (
    <div>
      <Form className="form-documentSearchForm" onSubmit={handleSubmit}>
              <Form.Group className="mb-3 doc-search-div" controlId="documentSearchForm">
                <Form.Label>
                  <h4>Search for a document</h4>
                </Form.Label>
                <div className="doc-search">
                  <Form.Control
                    input="text"
                    placeholder="enter document name here"
                    className="input form-control"
                    value={search}
                    onChange={(e) => handleChange('search', e)}
                  ></Form.Control>
                  <button className="btn btn-gray doc-search" type="submit">
                    Search
                  </button>
                </div>
              </Form.Group>
            </Form>
      <Table responsive="sm">
        <thead>
          <tr>
            <th scope="col">Uploaded</th>
            <th scope="col">Title</th>
            <th scope="col">Download</th>
            {instructor ? <th scope="col">Shared With</th> : <></>}
            {instructor ? <th scope="col">Delete</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <Doc
              auth={auth}
              studentList={studentList}
              doc={doc}
              instructor={instructor}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
