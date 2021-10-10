import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

export const EditProfile = ({ auth, profile }) => {
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [username, setUsername] = useState(profile.username);
  const [phone, setPhone] = useState('555-555-5555');
  const [email, setEmail] = useState(profile.email);

  const handleEdit = (event) => {
    event.preventDefault();
    axios.patch(
      'https://music-mvp.herokuapp.com/auth/users/me/',
      { email: email },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      }
    );
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleEdit(event);
        }}
      >
        <div class="form-group">
          <label>First Name</label>
          <input
            type="Name"
            class="form-control"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="Name"
            class="form-control"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
            class="form-control"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group" controlId="formBasicEmail">
          <label>Phone</label>
          <input
            type="phone"
            class="form-control"
            defaultValue={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group" controlId="formBasicEmail">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button class="btn btn-secondary" type="submit" onClick={handleEdit}>
          Save
        </button>
      </form>
    </div>
  );
};
