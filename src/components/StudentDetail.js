import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/studetail.css'

export const StudentDetail = ({auth, pk}) => {
    const [student, setStudent] = useState({})
    
    useEffect( async () => {
        let isMounted = true
            
            await axios.get(`https://music-mvp.herokuapp.com/api/users/${3}/`, {
                headers: {
                    Authorization: `token ${auth}`
                }
            })
            .then(res => {
                if (isMounted){
                    if (res.status === 200){
                        console.log(res.data)
                        setStudent(res.data)
                    }
                }
            })

            return () => {
                isMounted = false
            }
                    

        }, [])

    return (
        <div>
            <header className="stu-header">
                <h2>Student Detail: </h2>
                <h3>{student.first_name} {student.last_name}</h3>
                <div className="">
                    <p><i class="bi bi-person-circle"></i> {student.username}</p>
                    <p><i class="bi bi-envelope-fill"></i> {student.email}</p>
                    <p>Emergency Contact: {student.emergency_contacut_name}</p>
                    <p>Emergency Phone: {student.emergency_contact_phone}</p>
                </div>
            </header>
            <body className="stu-body">
                <p>lesson list goes here</p>
            </body>
        </div>
    );
}

