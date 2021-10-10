import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

export const EditProfile = ({ auth, profile }) => {
  const [editEmail, setEditEmail] = useState('');
  const handleEdit = (event) => {
    console.log(event);
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="Name" defaultValue={profile.first_name} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="Name" defaultValue={profile.last_name} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" defaultValue={profile.username} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="phone" defaultValue="5555555555" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" defaultValue={profile.email} />
        </Form.Group>

        <Button variant="secondary" type="submit" onClick={handleEdit}>
          Save
        </Button>
      </Form>
    </div>
  );
};
