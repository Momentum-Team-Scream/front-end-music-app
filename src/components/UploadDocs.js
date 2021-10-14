import { useRef } from 'react';
import axios from 'axios';

export const UploadDocs = ({ auth }) => {
  let fileInput = useRef(null);

  const submitFileData = () => {
    axios
      .post(
        `https://music-mvp.herokuapp.com/api/documents/`,
        { title: 'title' },
        {
          headers: {
            Authorization: `token ${auth}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const file = fileInput.current.files[0];
        console.log(file);
        console.log(fileInput);
        axios
          .put(
            `https://music-mvp.herokuapp.com/api/documents/${res.data.pk}/upload/`,
            { file },
            {
              headers: {
                Authorization: `token ${auth}`,
                'Content-Type': `${file.type}`,
                'Content-Disposition': `attachment; filename=${file.name}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
          });
      });
  };

  return (
    <div>
      <div>
        <input ref={fileInput} type="file" id="file-input" />
      </div>
      <div>
        <button onClick={submitFileData}>Submit Data</button>
      </div>
    </div>
  );
};
// };
