import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/register.css'


export const RegisterStu = ({ setAuth, props }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [emerName, setEmerName] = useState('')
    const [emerNumber, setEmerNumber] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [pk, setPk] = useState('')
    const history = useHistory()

    console.log(props)


    useEffect(() => {
        let isMounted = true

        const newArr = props.location.pathname.split('/');
        console.log(newArr)
        setPk(newArr.pop())

        return () => {
            isMounted = false
        }
    
    }, [props])

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
        if (inputType === 'emerName'){
            setEmerName(event.target.value)
        }
        if (inputType === 'emerNumber'){
            setEmerNumber(event.target.value)
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

        axios.post(`https://music-mvp.herokuapp.com/api/users/students/${pk}/`, 
        {
            "instructor": pk,
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "phone": phone,
            "username": username,
            "password": password,
            "re_password": rePassword,
            "emergency_contact_phone": emerNumber,
            "emergency_contact_name": emerName
        }).then(res => {
            if (res.status === 201){
                console.log('user created!')
                return axios.post('https://music-mvp.herokuapp.com/auth/token/login/', {
                    username: username,
                    password: password
                }).then((data) => {
                    if (data.data.auth_token) {
                        setAuth(data.data.auth_token)
                        history.push('/')
                    }
                })
            } else {
                console.log('something went wrong, please try again')
            }
        })
    }

    return (
        <>
            <form className='form register-form' onSubmit={handleSubmit}>
            <h2>Create your Student Account</h2>
                <div className="personal-info">
                    <p>Enter your contact information (this will be visible to your instructor)</p>
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
                        aria-required="false"
                        value={phone}
                        onChange={(event) => handleChange('phone', event)}
                    />
                    <label className="label">Emergency Contact Name</label>
                    <input
                        className="input form-control"
                        type="text"
                        aria-label="emergency contact name"
                        aria-required="true"
                        value={emerName}
                        onChange={(event) => handleChange('emerName', event)}
                    />
                    <label className="label">Emergency Contact Phone</label>
                    <input
                        className="input form-control"
                        type="number"
                        aria-label="emergency contact phone"
                        aria-required="true"
                        value={emerNumber}
                        onChange={(event) => handleChange('emerNumber', event)}
                    />
                </div>
                <div className="user-pw">
                    <p>Create your username and password to access your account</p>
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
                </div>
                <button type="submit" className="btn btn-general">Register</button>
                <Link to="/login">
                    <button  className="btn btn-gray">Cancel</button>
                </Link>
            </form>
        </>
    );
}


