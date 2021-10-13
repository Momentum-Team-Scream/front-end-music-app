// import { useRef } from 'react';
// import axios from 'axios';

// export const UploadDocs = ({ auth }) => {
//   let fileInput = useRef(null);

//   const submitFileData = () => {
//     axios.post(``,
//     {title:
//      author:} {
//       headers: {
//         Authorization: `token ${auth}`,

//       },
//     }).then(
//       ((res) => { axios.patch(`/${res.data.pk}`, fileInput, {
//         headers: {
//           Authorization: `token ${auth}`,
//           'Content-Type': fileInput.type,
//           'Content-Disposition': `attachment; filename=${fileInput.current.files[0].name}`,
//         },
//       }}))
//     );

//     return (
//       <div>
//         <div>
//           <input ref={fileInput} type="file" id="file-input" />
//         </div>
//         <div>
//           <button onClick={submitFileData}>Submit Data</button>
//         </div>
//       </div>
//     );
//   };
// };
