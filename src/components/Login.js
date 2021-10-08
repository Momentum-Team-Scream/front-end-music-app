import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import '../styles/login.css'


export const Login = ({ auth, setAuth, instructor, setInstructor }) => {
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post('https://music-mvp.herokuapp.com/auth/token/login/',
            {
                username: username,
                password: password
            })
            .then(response => {
                if (response.data.auth_token) {
                    setAuth(response.data.auth_token)
                }
            })
    }
    
    useEffect(() => {

        axios.get('https://music-mvp.herokuapp.com/auth/users/me/', {
            headers: {
                Authorization: `token ${auth}`
            }
        })
        .then(res => {
            console.log(res.data.is_instructor)
            if (res.status === 200){
                if (res.data.is_instructor === true){
                    setInstructor(true)
                    history.push('/')
                }
            }
            
        })
                

    }, [auth])

    console.log(instructor)

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

