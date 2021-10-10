import { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';


export const EditAssignment = ({ auth, note, pk, }) => {
  const [body, setBody] = useState(note);
  const history = useHistory();
  

    
  const handleEdit = (event) => {
    const id = event.target.id;
    event.preventDefault();
    axios.patch(
        `https://music-mvp.herokuapp.com/api/note/${id}`,
      { body: body },
      {lesson: `${pk}`},

      {    headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      }
    )
    .then((res) => {
        setBody('');
        history.push(`/lessons/${pk}/`);
      });
    
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleEdit(event);
        }}
      >
        <div class="form-group">
          <label>update Note</label>
          <input
            type="text"
            class="form-control"
            defaultValue={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        
        <button className="editButton btn btn-outline-secondary"
                id={pk}
                onClick={(e) => { if (window.confirm('Are you sure you want to edit this assignment?')) handleEdit(e)}}
                >
                    save update
                </button>


        {/* <button class="btn btn-secondary" type="submit" onClick={handleEdit}>
          Save
        </button> */}
      </form>
    </div>
  );
};