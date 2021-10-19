import { useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import '../styles/studentdash.css';

export const LogForm = ({ auth, setShow, setModalTitle }) => {
  const [body, setBody] = useState('');
  const [timePracticed, setTimePracticed] = useState('');
  const history = useHistory();
  const { pk } = useParams();

  const refreshPage = () => {
    window.location.reload(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        'https://music-mvp.herokuapp.com/api/practices/',
        {
          body: body,
          time_practiced: timePracticed,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          setShow(true);
          setModalTitle('Practice recorded!');
          setBody('');
          setTimePracticed('');
          history.go(0);
        }
      });
  };

  const handleChange = (inputType, event) => {
    if (inputType === 'body') {
      setBody(event.target.value);
    }
    if (inputType === 'time_practiced') {
      setTimePracticed(event.target.value);
    }
  };

  return (
    <>
      <form className="form-group" onSubmit={handleSubmit}>
        <h3 classname="practiceLogTitle">Add a Practice Log</h3>
        <textarea
          className="form-control what-did-you-practice"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="What did you practice?"
          type="text"
          value={body}
          onChange={(e) => handleChange('body', e)}
        ></textarea>
        <div className="form-group-time">
          <label className="label">How long did you practice?</label>
          <div
            className="input-group-text mb-3"
            onChange={(e) => handleChange('time_practiced', e)}
          >
            <Form.Control
              required
              as="select"
              defaultValue={''}
              onChange={(e) => handleChange('time_practiced', e)}
              className="input form-control"
              name="students"
            >
              <option key="" value="">
                click to select time practiced
              </option>
              <option value="15">15 minutes</option>
              <option value="20">20 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
              <option value="150">2.5 hours</option>
              <option value="180">3 hours</option>
              <option value="210">3.5 hours</option>
              <option value="240">4 hours</option>
            </Form.Control>
          </div>
        </div>
        <div className="button">
          <button type="submit" className="btn btn-general">
            Save Log
          </button>
        </div>
      </form>
    </>
  );
};
