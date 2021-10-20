import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import birdmusicnotesright from '../birds/birdmusicnotesright.png'
import { Container } from 'react-bootstrap';
import '../styles/login.css'


export const Login = ({ auth, setAuth, instructor, setInstructor }) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [userErr, setUserErr] = useState(false)
    const [passErr, setPassErr] = useState(false)
    const [valErr, seValErr] = useState(false)
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
        setUserErr(false)
        setPassErr(false)
        seValErr(false)
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
            .catch(error => {
                if(error.response) {
                    const err = error.response.data
                    if (err.username) {
                        setUserErr(true)
                    } if (err.password) {
                        setPassErr(true)
                    } if (err.non_field_errors){
                        seValErr(true)
                    }
                }
            })
    }
    
    useEffect(() => {
        let isMounted = true
        
        axios.get('https://music-mvp.herokuapp.com/auth/users/me/', {
            headers: {
                Authorization: `token ${auth}`
            }
        })
        .then(res => {
            if (isMounted){
                if (res.status === 200){
                    if (res.data.is_instructor === true){
                        setInstructor(true)
                    } 
                    history.push('/')
                }
            }
        })

        return () => {
            isMounted = false
        }
                

    }, [auth])

    return (
        <>
            <Container>
                <form className='form login-form' onSubmit={handleSubmit} noValidate>
                    <label className="label">Username</label>
                    {userErr ? 
                        <>
                            <div className="error-div">
                                <p>Username must not be empty</p>
                            </div>
                        </>
                        : null
                    }
                    <input 
                        className="input form-control"
                        type="text"
                        value={username}
                        onChange={(event) => handleChange('username', event)}
                    />
                    <label className="label">Password</label>
                    {passErr ? 
                        <>
                            <div className="error-div">
                                <p>Password must not be empty</p>
                            </div>
                        </>
                        : null
                    }
                    <input 
                        className="input form-control"
                        type="password"
                        value={password}
                        onChange={(event) => handleChange('password', event)}
                    />
                    {valErr ? 
                        <>
                            <div className="error-div">
                                <p>Incorrect username/password combo</p>
                            </div>
                        </>
                        : null
                    }
                    <button className="btn btn-general" type="submit">Login</button>
                </form>
                <div className="redirect-text">New to NoteJam? Register for your instructor account <Link to="/register">here.</Link></div>
                <img className="login-img" src={birdmusicnotesright} alt="bird-notes"></img>
            </Container>
        </>
    );
}

