import { useState } from 'react';

import axios from 'axios';
import '../styles/profile.css';

export const EditProfile = ({ auth, profile }) => {
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);

  const [phone, setPhone] = useState('555-555-5555');
  const [email, setEmail] = useState(profile.email);

  const handleEdit = (event) => {
    axios.patch(
      'https://music-mvp.herokuapp.com/auth/users/me/',
      {
        first_name: firstName,
        last_name: lastName,

        phone: phone,
        email: email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      }
    );
  };
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <div>
      <form
        onSubmit={(event) => {
          handleEdit(event);
        }}
      >
        <div className="form-group">
          <label>First Name</label>
          <input
            type="Name"
            className="form-control"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="Name"
            className="form-control"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group" controlId="formBasicEmail">
          <label>Phone</label>
          <input
            type="phone"
            className="form-control"
            defaultValue={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group" controlId="formBasicEmail">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="profButton btn btn-secondary"
          type="submit"
          onClick={function (event) {
            handleEdit();
            refreshPage();
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
};
