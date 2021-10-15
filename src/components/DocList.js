import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { UploadDocs } from './UploadDocs.js';
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
      {docs.map((doc, index) => (
        <p>{doc.title}</p>
      ))}
      <UploadDocs />
    </div>
  );
};
