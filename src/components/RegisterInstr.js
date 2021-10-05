import React, { useState } from 'react';
import axios from 'axios';

export const RegisterInstructor = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    
    const handleChange = (inputType, event) => {
        if (inputType === 'firstName'){
            setFirstName(event.target.value)
        }
        if (inputType === 'lastName'){
            setLastName(event.target.value)
        }
        if (inputType === 'email'){
            setEmail(event.target.value)
        }
        if (inputType === 'phone'){
            setPhone(event.target.value)
        }
        if (inputType === 'username'){
            setUsername(event.target.value)
        }
        if (inputType === 'password'){
            setPassword(event.target.value)
        }
        if (inputType === 'rePassword'){
            setRePassword(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('form submitted!')
        console.log(firstName)
        console.log(lastName)
        console.log(email)
        console.log(phone)
        console.log(username)
        console.log(password)
        console.log(rePassword)

        axios.post('https://music-mvp.herokuapp.com/auth/users/', 
        {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "phone": phone,
            "username": username,
            "password": password,
            "re_password": rePassword,
            "emergency_contact_phone": "5555555555",
            "emergency_contact_name": "unknown"
        }).then(res => {
            if (res.status === 201){
                console.log('user created!')
            } else {
                console.log('something went wrong, please try again')
            }
        })
    }

    return (
        <>
            <form className='form register-form' onSubmit={handleSubmit}>
                <label className="label">First Name</label>
                <input
                    className="input form-control"
                    type="text"
                    aria-label="first name"
                    aria-required="true"
                    value={firstName}
                    onChange={(event) => handleChange('firstName', event)}
                />
                <label className="label">Last Name</label>
                <input
                    className="input form-control"
                    type="text"
                    aria-label="last name"
                    aria-required="true"
                    value={lastName}
                    onChange={(event) => handleChange('lastName', event)}
                />
                <label className="label">Email</label>
                <input
                    className="input form-control"
                    type="email"
                    aria-label="email"
                    aria-required="true"
                    value={email}
                    onChange={(event) => handleChange('email', event)}
                />
                <label className="label">Phone (optional)</label>
                <input
                    className="input form-control"
                    type="number"
                    aria-label="phone"
                    aria-required="true"
                    value={phone}
                    onChange={(event) => handleChange('phone', event)}
                />
                <label className="label">Username</label>
                <input
                    className="input form-control"
                    type="text"
                    aria-label="username"
                    aria-required="true"
                    value={username}
                    onChange={(event) => handleChange('username', event)}
                />
                <label className="label">Password</label>
                <input
                    className="input form-control"
                    type="password"
                    aria-label="password"
                    aria-required="true"
                    value={password}
                    onChange={(event) => handleChange('password', event)}
                />
                <label className="label">Re-type Password</label>
                <input
                    className="input form-control"
                    type="password"
                    aria-label="retype password"
                    aria-required="true"
                    value={rePassword}
                    onChange={(event) => handleChange('rePassword', event)}
                />
                <button type="submit" className="btn btn-dark">Register</button>
            </form>
        </>
    );
}


