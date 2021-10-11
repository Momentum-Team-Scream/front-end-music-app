import { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';


export const EditAssignment = ({ auth, note, pk, noteId }) => {
  const lesson = (pk)
  const [body, setBody] = useState(note);
  const history = useHistory();
  console.log (pk)
  console.log (noteId)
  console.log (lesson)

    
  const handleEdit = (event, id) => {
    
    console.log(id)
    event.preventDefault();
    axios.patch(
        `https://music-mvp.herokuapp.com/api/note/${noteId}/`,
      { body: body ,
      lesson: `${lesson}`},

      {    headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      }
    )
    .then((res) => {
        setBody('');
        history.push(`/lessons/${lesson}/`);
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
          {/* <label>Update Assignment below</label> */}
          <input
            type="text"
            class="form-control"
            defaultValue={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        
        <button className="editButton btn btn-outline-secondary"
                id={pk}
                onClick={(e) => { handleEdit(e)}}
                >
                    Save Update
                </button>


        {/* <button class="btn btn-secondary" type="submit" onClick={handleEdit}>
          Save
        </button> */}
      </form>
    </div>
  );
};