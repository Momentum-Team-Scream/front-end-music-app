import React, { useState, useEffect } from 'react';
import axios from 'axios';
export const InstrProfile = ({ auth }) => {
  const [profile, setProfile] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (auth) {
      axios
        .get(`https://music-mvp.herokuapp.com/auth/users/me/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        })
        .then((res) => {
          setProfile(res.data);
          console.log(res.data);
        });
      setSubmitted(false);
    }
  }, [auth, submitted]);

  return (
    <>
      <h1>hi</h1>
      <p>{profile.last_name}</p>
    </>
  );
};
