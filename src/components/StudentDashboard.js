import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { AssignmentList } from './AssignmentList';
import '../styles/profile.css'

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
            <header className="profileTitle">
                <h2>{user.first_name} {user.last_name}</h2>
            </header>
            <div className="profileBody">
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <h3>Emergency Contact:</h3>
                <p>Name: {user.emergency_contact_name}</p>
                <p>Phone: {user.emergency_contact_phone}</p>
            </div>
            <div>
                <AssignmentList auth={auth}/>
            </div>
        </>
    );
}

