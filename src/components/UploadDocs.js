import { useRef } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import { Form } from 'react-bootstrap';
import '../styles/docs.css';


export const UploadDocs = ({ auth }) => {
  let fileInput = useRef(null);
  const [student, setStudent] = useState([]);
  const [studentList, setStudentList] = useState([]);

  // const getStudentList = () => {
  useEffect(() => {
    axios
      .get(`https://music-mvp.herokuapp.com/instructor/studio/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      })
      .then((response) => {
        console.log(response);
        setStudentList(response.data);
        console.log(studentList);
      });
  }, [auth]);

  const submitFileData = (event) => {
    event.preventDefault();
    console.log(student)
    axios
      .post(
        `https://music-mvp.herokuapp.com/api/documents/`,
        { title: `${fileInput.current.files[0].name}`, 
          students: student
      },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,

          },
        }
      )
      .then((res) => {
        console.log(res);
        const file = fileInput.current.files[0];
        console.log(file);
        console.log(fileInput);
        axios
          .put(
            `https://music-mvp.herokuapp.com/api/documents/${res.data.pk}/upload/`,
            { file },
            {
              headers: {
                Authorization: `token ${auth}`,
                'Content-Type': `${file.type}`,
                'Content-Disposition': `attachment; filename=${file.name}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
          });
      }
      );
  };

  const handleChange = (inputType, event) => {
    if (inputType === 'student') {
      setStudent([event.target.value]);
    }
  };

  return (
    <Container>
    {/* <div className="docUploadDiv">
      <div className="form-group" style={{width: '300px'}}> */}
      <h4> Upload documents to share! </h4>
      <Form className="form-docUploadForm" onSubmit={submitFileData} >
        <Form.Group controlId="uploadDocs">
        <Form.Label>Click button to add a file:</Form.Label>
        <Form.Control 
          type="file" 
          ref={fileInput} 
          type="file" 
          id="file-input" />
        
        <Form.Label>Select a student to share with:</Form.Label>
        <Form.Control
          required
          as="select"
          onChange={(e) => handleChange('student', e)}
          className="input form-control"
          name="students"
        >
          {studentList.map((student, idx) => (
            <option key={idx} value={student.pk}>
              {student.first_name} {student.last_name}
            </option>
          ))}
        </Form.Control>
      <div>
        <button className="btn btn-general">Submit Data</button>
      </div>
    </Form.Group>
    </Form>
    {/* </div>
  </div> */}
  </Container>
  );
};

