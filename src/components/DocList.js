import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { UploadDocs } from './UploadDocs.js';
import '../styles/StudentList.css';
import { Dropdown, Table, Container, Form } from 'react-bootstrap';

export const DocList = ({ auth }) => {
  const [docs, setDocs] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (auth) {
      axios
        .get(`https://music-mvp.herokuapp.com/api/documents/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        })
        .then((res) => {
          setDocs(res.data);
          console.log(res.data);
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
            <th scope="col">Shared With</th>
            <th scope="col">Add Student</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc, index, auth) => (
            <>
              <tr>
                <td>{doc.uploaded_at}</td>

                <td>
                  {doc.title}
                  <a href={doc.upload} download>
                    <img
                      className="icon"
                      src={'icons8download.png'}
                      alt="download icon"
                    />
                  </a>
                </td>
                <td>
                  <a href={doc.upload} download>
                    {doc.upload}
                  </a>
                </td>
                <td>
                  <Dropdown role="menuitemcheckbox">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        {' '}
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        >
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
