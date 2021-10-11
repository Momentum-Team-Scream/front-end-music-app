import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css';
import { Card } from 'react-bootstrap';
import { LogForm } from './LogForm.js';
import { EditProfile } from './EditProfile.js';
export const InstrProfile = ({ auth }) => {
  const [profile, setProfile] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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
        });
      setSubmitted(false);
    }
  }, [auth, submitted]);

  return (
    <>
      <h1 className="profileTitle">{profile.username}'s Profile</h1>
      <div className="profileBody">
        {showEdit ? (
          <EditProfile profile={profile} auth={auth} />
        ) : (
          <>
            <Card>
              <div className="profileText">
                <p>
                  <strong> Name: </strong> {profile.first_name}{' '}
                  {profile.last_name}
                </p>

                <p>
                  <strong>Phone: </strong>
                  {profile.phone}
                </p>
                <p>
                  <strong>Email: </strong>
                  {profile.email}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowEdit(true);
                }}
                className="editButton btn btn-outline-secondary"
              >
                Edit
              </button>
            </Card>
            <LogForm auth={auth} />
          </>
        )}
      </div>
    </>
  );
};
