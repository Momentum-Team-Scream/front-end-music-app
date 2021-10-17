import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Doc } from './Doc.js';
import '../styles/StudentList.css';
import { Dropdown, Table, Container, Form } from 'react-bootstrap';

export const DocList = ({ auth, studentList }) => {
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
          console.log(res)
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
            <th scope="col">Shared With</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc, index, auth) => (
            <Doc auth={auth} studentList={studentList} doc={doc} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
