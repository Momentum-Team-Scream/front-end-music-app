import { Dropdown, Table, Container, Form } from 'react-bootstrap';
import '../styles/StudentList.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const Doc = ({ auth, studentList, doc }) => {
  const handleCheck = (event, pk) => {
    event.preventDefault();

    if (doc.students.includes(pk)) {
      const shared = doc.students;
      shared.pop(pk);
      axios
        .patch(
          `https://music-mvp.herokuapp.com/api/documents/${doc.pk}/`,
          { students: shared },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `token ${auth}`,
            },
          }
        )
        .then(() => {});
    } else {
      const shared = doc.students;
      shared.push(pk);
      axios
        .patch(
          `https://music-mvp.herokuapp.com/api/documents/${doc.pk}/`,
          { students: shared },

          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `token ${auth}`,
            },
          }
        )
        .then(() => {});
    }
  };
  return (
    <>
      <tr>
        <td>{doc.uploaded_at}</td>

        <td className="maya">{doc.title}</td>
        <td>
          <a href={doc.upload} download={doc.upload} className="iconLink">
            <img
              className="icon"
              src={'icons8download.png'}
              alt="download icon"
            />
          </a>
        </td>
        <td className="drop">
          <Dropdown role="menuitemcheckbox">
            <Dropdown.Toggle
              variant="secondary"
              className="dropdown-basic BUTT"
            >
              Student List
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {studentList.map((student, idx) => {
                let full_name = student.first_name + ' ' + student.last_name;
                return (
                  <Dropdown.Item href="#/action-1" key={idx}>
                    <Form>
                      <Form.Check
                        type="checkbox"
                        label={full_name}
                        id={student.pk}
                        defaultChecked={doc.students.includes(student.pk)}
                        onChange={(e) => {
                          handleCheck(e, student.pk);
                        }}
                      />
                    </Form>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </>
  );
};
