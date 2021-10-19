import { useRef } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';
import '../styles/docs.css';


export const StudentRegEmailForm = ({ auth, setSubmitted, pk, setShow }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [instructor_url] = "`https://music-mvp.herokuapp.com/api/student-invite/${pk}/`";
    const [nameErr, setNameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    // const [instructor_urlErr, setInstructor_urlErr] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setNameErr(false);
    setEmailErr(false);
    // setInstructor_urlErr(false);
    axios
      .post(
        'https://music-mvp.herokuapp.com/api/mail/send/',
        {
          "name": name,
          "email": email,
        //   "instructor_url": `https://music-mvp.herokuapp.com/api/student-invite/${instructor}/`
          "instructor_url": `http://localhost:3000/api/student-invite/${pk}/`

        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSubmitted(true);
          setShow(true);
        //   setModalTitle('Lesson Added!')
          setName('');
          setEmail('');
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          const err = error.response.data;
          if (err.name) {
            setNameErr(true);
          }
          if (err.email) {
            setEmailErr(true);
          }
        //   if (err.instructor_url) {
        //     setInstructor_urlErr(true);
        //   }
        }
      });
  };

  const handleChange = (inputType, event) => {
    if (inputType === 'name') {
      setName(event.target.value);
    }
    if (inputType === 'email') {
      setEmail(event.target.value);
    }
    // if (inputType === 'instructor_url') {
    //   setInstructor_url(event.target.value);
    // }
  };


  return (
    <Container>
        <div>
          <h4> Student Registration Link </h4>
          <Form className="form-emailStuRegForm" onSubmit={handleSubmit}>
            <Form.Group controlId="studentInfo">
              <Form.Label>Student's name:</Form.Label>
              {nameErr ? (
                <>
                  <p>You did not enter the student's name</p>
                </>
              ) : null}
              <Form.Control as="textarea" rows={1} 
              placeholder="Enter students name here"
              type="text"
              value={name}
              onChange={(e) => handleChange('name', e)}/>


              <Form.Label>Student's email address:</Form.Label>
              {emailErr ? (
                <>
                  <p>you did not enter the student's email</p>
                </>
              ) : null}
              <Form.Control
                type="email" placeholder="name@email.com"
                onChange={(e) => handleChange('email', e)}
                className="input form-control"
                name="email"
              />
            </Form.Group>
            <Form.Group>
              <div>
                <button type="submit" className="btn btn-general">Send Link</button>
              </div>
            </Form.Group>
          </Form>
        </div>
    </Container>
    );
}