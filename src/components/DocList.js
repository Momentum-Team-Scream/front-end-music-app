import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Doc } from './Doc.js';
import '../styles/StudentList.css';
import { Dropdown, Table, Container, Form } from 'react-bootstrap';

export const DocList = ({ auth, studentList, instructor }) => {
  const [docs, setDocs] = useState([]);
  const [submitted, setSubmitted] = useState(false);

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

  return (
    <div>
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
