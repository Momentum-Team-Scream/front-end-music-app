import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { AssignmentList } from './AssignmentList';
import { LogForm } from './LogForm'
import '../styles/studentdash.css'

export const StudentDashboard = ({auth}) => {
    const [user, setUser] = useState('')

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
                        console.log(res.data)
                        setUser(res.data)
                    }
                }
            })

            return () => {
                isMounted = false
            }
                    

        }, [])
    
    return (
        <>
            <header className="dash-header">
                <div className="name-edit-links">
                    <h2>{user.first_name} {user.last_name}</h2>
                    <Link to="/profile">
                        <p>Edit Info</p>
                    </Link>
                </div>
                <div className="">
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Emergency Contact Name: {user.emergency_contact_name}</p>
                    <p>Emergency Contact Phone: {user.emergency_contact_phone}</p>
                </div>
            </header>
            <div className="dash-body col-xxl-12 row flex-lg-row-reverse justify-content-center">
                <div className="col-lg-6">
                    <LogForm auth={auth}/>
                </div>
                <div className="col-lg-6">
                    <AssignmentList auth={auth}/>
                </div>
            </div>
        </>
    );
}

