import { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';


export const EditAssignment = ({ auth, note, pk }) => {
  const lesson =(pk)
  const [body, setBody] = useState(note);
  const history = useHistory();
  console.log (pk)

    
  const handleEdit = (event) => {
    
    const id = event.target.id;
    console.log(id)
    event.preventDefault();
    axios.patch(
        'https://music-mvp.herokuapp.com/api/note/49/',
      { body: body ,
      lesson: "70"},

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
                id={note.pk}
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