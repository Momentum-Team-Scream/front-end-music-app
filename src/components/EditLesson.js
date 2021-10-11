// import { useEffect, useState } from 'react';
// import { useParams, useHistory, Link } from 'react-router-dom';
// import { Form, Button, Card } from 'react-bootstrap';
// import axios from 'axios';


// export const EditAssignment = ({ auth, note, pk }) => {
//   const [body, setBody] = useState(note);
//   const history = useHistory();
  
//   const [lessonDate, setLessonDate] = useState(lesson.lesson_date);
//   const [lessonTime, setLessonTime] = useState(lesson.lesson_time);
//   const [plan, setPlan] = useState(lesson.plan);


    
//   const handleEdit = (event) => {
//     const id = event.target.id;
//     event.preventDefault();
//     axios.patch(
//         `https://music-mvp.herokuapp.com/api/lessons/${id}`,
//         {   lesson_date: lessonDate ,
//             lesson_time: lessonTime,
//             plan: plan
//         },

//       {    headers: {
//           'Content-Type': 'application/json',
//           Authorization: `token ${auth}`,
//         },
//       }
//     )
//     .then((res) => {
//         setBody('');
//         history.push(`/lessons/${pk}/`);
//       });
//   };

//   return (
//     <div>
//       <form
//         onSubmit={(event) => {
//           handleEdit(event);
//         }}
//       >
//         <div class="form-group">
//           <label>Update Assignment below</label>
//           <input
//             type="text"
//             class="form-control"
//             defaultValue={body}
//             onChange={(e) => setBody(e.target.value)}
//           />
//         </div>
        
//         <button className="editButton btn btn-outline-secondary"
//                 id={pk}
//                 onClick={(e) => { handleEdit(e)}}
//                 >
//                     Save Update
//                 </button>


//         {/* <button class="btn btn-secondary" type="submit" onClick={handleEdit}>
//           Save
//         </button> */}
//       </form>
//     </div>
//   );
// };