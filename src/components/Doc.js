import { Dropdown, Form } from 'react-bootstrap';
import '../styles/login.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';

export const Doc = ({ auth, studentList, doc, instructor, setsubmitted }) => {
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);

  const handleDelete = (event) => {
    const id = event.target.id;
    return axios
      .delete(`https://music-mvp.herokuapp.com/api/documents/${doc.pk}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      })
      .then((res) => {
        setSubmitted(true);
      });
  };

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
        .then(() => {
          history.go(0);
        });
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
        .then(() => {
          history.go(0);
        });
    }
  };
  return (
    <>
      <tr>
        <td>{doc.uploaded_at}</td>

        <td className="downloadCont">{doc.title}</td>
        <td>
          <a href={doc.upload} download={doc.upload} className="iconLink">
            <img
              className="icon"
              src={'icons8download.png'}
              alt="download icon"
            />
          </a>
        </td>
        {instructor ? (
          <td className="drop">
            <Dropdown role="menuitemcheckbox">
              <Dropdown.Toggle
                variant="secondary"
                className="dropdown-basic dropbutt"
              >
                Student List
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {studentList.map((student) => {
                  let full_name = student.first_name + ' ' + student.last_name;
                  return (
                    <Dropdown.Item href="#/action-1" key={student.pk}>
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
        ) : (
          <></>
        )}
        {instructor ? (
          <td>
            <button
              className="delButton btn btn-destroy docdel"
              id={doc.pk}
              onClick={(e) => {
                if (
                  window.confirm(
                    'Are you sure you want to delete this document?'
                  )
                )
                  handleDelete(e);
              }}
            >
              Delete
            </button>
          </td>
        ) : (
          <></>
        )}
      </tr>
    </>
  );
};
