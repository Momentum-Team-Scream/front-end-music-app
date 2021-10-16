import { Dropdown, Table, Container, Form } from 'react-bootstrap';
import '../styles/StudentList.css';
import React, { useState } from 'react';
import axios from 'axios';

export const Doc = ({ auth, studentList, doc }) => {
  const [sharedStudents, setSharedStudents] = useState(doc.students);
  console.log(sharedStudents);

  const handleCheck = (pk) => {
    if (sharedStudents.includes(pk)) {
      // Request to remove student from doc's student array
    } else {
      // Request to add student to doc's student array
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
                  <Dropdown.Item href="#/action-1">
                    <Form>
                      <Form.Check
                        key={idx}
                        type="checkbox"
                        label={full_name}
                        id={student.pk}
                        defaultChecked={sharedStudents.includes(student.pk)}
                        onChange={handleCheck(student.pk)}
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
