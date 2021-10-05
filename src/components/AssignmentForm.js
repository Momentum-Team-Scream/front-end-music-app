import { useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

export const AssignmentForm = ({ token }) => {
  const [body, setBody] = useState('');
  const history = useHistory();
  const { pk } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        'https://questionbox-team-skywalker.herokuapp.com/api/answers/new',
        {
          question: `${pk}`,
          body: body,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
        }
      )
      .then((res) => {
        setBody('');
        // history.push(`/notes/${pk}/`);
      });
  };

  const handleChange = (inputType, event) => {
    if (inputType === 'body') {
      setBody(event.target.value);
    }
  };

  return (
    <>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Assignment Note</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Enter Answer Here"
          type="text"
          value={body}
          onChange={(e) => handleChange('body', e)}
        ></textarea>
      </div>

      <div className="button">
        <button className="uk-button">Send Note to Student</button>
      </div>
    </>
  );
};
