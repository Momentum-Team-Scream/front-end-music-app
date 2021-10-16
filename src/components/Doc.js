import { Dropdown, Table, Container, Form } from 'react-bootstrap';
import '../styles/StudentList.css';
import React, { useState } from 'react';

export const Doc = ({ auth, studentList, doc }) => {
  const [sharedStudents, setSharedStudents] = useState(doc.students);

  const handleCheck = () => {};

  return (
    <>
      <tr>
        <td>{doc.uploaded_at}</td>

        <td className="maya">{doc.title}</td>
        <td>
          
          <a
            onClick={() => {
              window.open(`${doc.upload}`);
            }}
          >
            <button type="button" className="btn detbtn btn-general">
              view doc
            </button>
          </a>
          
          {/* <a href=`S{doc.upload}` download={doc.upload} className="iconLink">
            <img
              className="icon"
              src={'icons8download.png'}
              alt="download icon"
            />
          </a> */}


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
                return (
                  <Dropdown.Item href="#/action-1">
                    <Form>
                      <Form.Check
                        key={idx}
                        type="checkbox"
                        label={student.first_name}
                        id={student.pk}
                        defaultChecked={sharedStudents.includes(student.pk)}
                        onChange={handleCheck()}
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
