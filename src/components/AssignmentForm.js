import { useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

export const AssignmentForm = ({ auth }) => {
  const [body, setBody] = useState('');
  const history = useHistory();
  //   const { pk } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('CLICK');
    axios
      .post(
        'https://music-mvp.herokuapp.com/api/note/',
        {
          body: body,
          lesson: 26,
          is_assignment: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token 4ae18a4c0843f4cdccb2f76fc5228e59d747e429`,
          },
        }
      )
      .then((res) => {
        setBody('');
      });
  };

  const handleChange = (inputType, event) => {
    if (inputType === 'body') {
      setBody(event.target.value);
    }
  };
  console.log(auth);
  return (
    <>
      <form className="form-group" onSubmit={handleSubmit}>
        <label for="exampleFormControlTextarea1">Assignment Note</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Enter assignment note here"
          type="text"
          value={body}
          onChange={(e) => handleChange('body', e)}
        ></textarea>
        <div className="button">
          <button type="submit" className="btn btn-dark">
            Send note to student
          </button>
        </div>
      </form>
    </>
  );
};
