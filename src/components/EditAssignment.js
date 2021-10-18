import { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/studentdash.css';

export const EditAssignment = ({ auth, note, pk, noteId, setShow }) => {
  const lesson = pk;
  const [body, setBody] = useState(note);
  const history = useHistory();
  console.log(pk);
  console.log(noteId);
  console.log(lesson);

  const handleEdit = (event, id) => {
    console.log(id);
    event.preventDefault();
    axios
      .patch(
        `https://music-mvp.herokuapp.com/api/note/${noteId}/`,
        { body: body, lesson: `${lesson}` },

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        }
      )
      .then((res) => {
        setShow(true)
        setBody('');
        history.push(`/lessons/${lesson}/`);
      });
  };

  return (
    <div className="card">
      <form
        onSubmit={(event) => {
          handleEdit(event);
        }}
      >
        <div class="form-group">
          <textarea
            class="form-control"
            defaultValue={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
          ></textarea>
        </div>
        <div className="card-footer">
          <button
            className="btn detbtn btn-general"
            id={pk}
            onClick={(e) => {
              handleEdit(e);
            }}
          >
            Save Update
          </button>
        </div>
      </form>
    </div>
  );
};
