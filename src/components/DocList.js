import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { UploadDocs } from './UploadDocs.js';
import '../styles/StudentList.css';

export const DocList = ({ auth }) => {
  const [docs, setDocs] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (auth) {
      axios
        .get(`https://music-mvp.herokuapp.com/api/documents/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        })
        .then((res) => {
          setDocs(res.data);
          console.log(res.data);
        });
      setSubmitted(false);
    }
  }, [auth, submitted]);

  return (
    <div>
      <UploadDocs />

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Uploaded</th>
            <th scope="col">Title</th>
            <th scope="col">Shared With</th>
            <th scope="col">Add Student</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc, index, auth) => (
            <>
              <tr>
                <td>{doc.uploaded_at}</td>

                <td>
                  {doc.title}
                  <a href="{doc.upload}" download>
                    <img
                      className="icon"
                      src={'icons8download.png'}
                      alt="download icon"
                    />
                  </a>
                </td>
                <td>
                  <a href={doc.upload} download>
                    {doc.upload}
                  </a>
                </td>
                <td></td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
