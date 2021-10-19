import { useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { ConfirmModal } from './ConfirmModal'

export const AssignmentForm = ({ auth, showing, setShowing, modalTitle, setModalTitle }) => {
  const [body, setBody] = useState('');
  const history = useHistory();
  const { pk } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        'https://music-mvp.herokuapp.com/api/note/',
        {
          body: body,
          lesson: `${pk}`,
          is_assignment: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        }
      )
      .then((res) => {
        setBody('');
        setShowing(true)
        setModalTitle('Homework note added!')
        history.push(`/lessons/${pk}/`);
      });
  };

  const handleChange = (inputType, event) => {
    if (inputType === 'body') {
      setBody(event.target.value);
    }
  };

  return (
    <>
      <ConfirmModal show={showing} setShow={setShowing} modalTitle={modalTitle} />
      <div className="card">
      <div div className="card-header assignment-form">
          <h4>Homework for Student</h4>
        </div>
        <div class="form-group">
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control lesson-detail"
          placeholder="Click to enter note for student"
          type="text"
          value={body}
          onChange={(e) => handleChange('body', e)}
          rows={5}
        ></textarea>
          <button type="submit" className="btn btn-alert lesson-detail">
            Send to Student
          </button>
      </form>
      </div>
      </div>
    </>
  );
};
