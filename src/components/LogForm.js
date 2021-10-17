import { useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { ConfirmModal } from './ConfirmModal';

export const LogForm = ({ auth, show, setShow }) => {
  const [body, setBody] = useState('');
  const [timePracticed, setTimePracticed] = useState('');
  const history = useHistory();
  const { pk } = useParams();

  // const refreshPage = () => {
  //   window.location.reload(false);
  // };

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
        if (res.status === 201){
          setBody('');
          setTimePracticed('');
          setShow(true);
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
      <ConfirmModal show={show} setShow={setShow}/>
      <form className="form-group" onSubmit={handleSubmit}>
        <h3>Add a Practice Log:</h3>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="What did you practice?"
          type="text"
          value={body}
          onChange={(e) => handleChange('body', e)}
        ></textarea>
        <div className="form-group-time">
          <input
            type="text"
            value={timePracticed}
            className="form-control"
            placeholder="How long did you practice?"
            onChange={(e) => handleChange('time_practiced', e)}
          />
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
