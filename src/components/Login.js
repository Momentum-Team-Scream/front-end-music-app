import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const Login = ({ auth, setAuth }) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const history = useHistory()


    const handleChange = (inputType, event) => {
        if (inputType === 'username'){
            setUsername(event.target.value)
        }
        if (inputType === 'password') {
            setPassword(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('https://music-mvp.herokuapp.com/auth/token/login/',
            {
                username: username,
                password: password
            })
            .then(response => {
                console.log(response)
                if (response.data.auth_token) {
                    setAuth(response.data.auth_token)
                    history.push('/')
                }
            })
    }
    
    console.log(auth)

    return (
        <>
            <form className='form login-form' onSubmit={handleSubmit}>
                <label className="label">Username</label>
                <input 
                    className="input form-control"
                    type="text"
                    value={username}
                    onChange={(event) => handleChange('username', event)}
                />
                <label className="label">Password</label>
                <input 
                    className="input form-control"
                    type="password"
                    value={password}
                    onChange={(event) => handleChange('password', event)}
                />
                <button className="btn btn-secondary" type="submit">Login</button>
            </form>
            
        </>
    );
}

