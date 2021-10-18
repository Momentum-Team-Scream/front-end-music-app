import { useRef } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';
import '../styles/docs.css';
import { DocList } from './DocList.js';
import { BirdStaff } from '../svgComponents/BirdStaff';

export const UploadDocs = ({ auth, instructor }) => {
  let fileInput = useRef(null);
  const [student, setStudent] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [fileErr, setFileErr] = useState(false);
  const history = useHistory();

  useEffect(() => {

    axios
      .get(`https://music-mvp.herokuapp.com/instructor/studio/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      })
      .then((response) => {
        setStudentList(response.data);
      });
  }, [auth]);

  const submitFileData = (event) => {
    event.preventDefault();
    setFileErr(false);
    if (fileInput.current.files[0] !== undefined )
    axios
      .post(
        `https://music-mvp.herokuapp.com/api/documents/`,
        { title: `${fileInput.current.files[0].name}`, students: student },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) 
        {
          console.log(res)
          console.log(fileInput.current.files)
          const file = fileInput.current.files[0]
          console.log(file);
          axios
            .put(
              `https://music-mvp.herokuapp.com/api/documents/${res.data.pk}/upload/`,
              file,
              {
                headers: {
                  Authorization: `token ${auth}`,
                  'Content-Type': `application ${file.type}`,
                  'Content-Disposition': `attachment; filename=${file.name}`,
                },
              }
            )
            .then((res) => {
              if (res.status === 201) {
                alert('document uploaded');
                history.go(0);
              }

            });
        }
      })
      .catch((err) => {
        if (err.response) {
          setFileErr(true);
        }
      });
      else (alert('you did not attach a file to upload'))};

  const handleChange = (inputType, event) => {
    if (inputType === 'student') {
      setStudent([event.target.value]);
    }
  };

  return (
    <Container>
      {instructor ? (
        <div>
          <h4> Upload documents to share! </h4>
          <Form className="form-docUploadForm" onSubmit={submitFileData}>
            <Form.Group controlId="uploadDocs">
              <Form.Label>Click button to add a file:</Form.Label>
              {fileErr ? (
                <>
                  <p>you did not attach a file</p>
                </>
              ) : null}
              <Form.Control type="file" ref={fileInput} type="file" />
              <Form.Label>
                Select a student to share with (optional):
              </Form.Label>
              <Form.Control
                optional
                as="select"
                defaultValue={''}
                onChange={(e) => handleChange('student', e)}
                className="input form-control"
                name="students"
              >
                <option key="" value={''}>
                click to select student
                </option>
                {studentList.map((student, idx) => (
                  <option key={idx} value={student.pk}>
                    {student.first_name} {student.last_name}
                  </option>
                ))}
              </Form.Control>
              <div>
                <button className="btn btn-general">Upload Doc</button>
              </div>
            </Form.Group>
          </Form>
        </div>
      ) : (
        <div className="musicbirdcontlist">
          <h1 className="musicTitle">Your Music</h1>
          <div className="birdiconmusic">
            <BirdStaff />
          </div>
        </div>
      )}
      <br />
      <div>
        <DocList
          auth={auth}
          studentList={studentList}
          instructor={instructor}
        />
      </div>
    </Container>
  );
};
