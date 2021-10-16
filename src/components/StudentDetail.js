import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TextTruncate from 'react-text-truncate';
import '../styles/studetail.css'

export const StudentDetail = ({auth, props}) => {
    const [student, setStudent] = useState({})
    const [lessons, setLessons] = useState([])
    const [name, setName] = useState('')
    const [pk, setPk] = useState('')

    useEffect( async () => {
        let isMounted = true

        const newArr = props.location.pathname.split('/');
        console.log(props.location.pathname)
        setPk(newArr.pop())
        console.log(pk)

        await axios.get(`https://music-mvp.herokuapp.com/api/users/${pk}`, {
            headers: {
                Authorization: `token ${auth}`
            }
        })
        .then(res => {
            if (isMounted){
                if (res.status === 200){
                    console.log(res.data)
                    setStudent(res.data)
                    setName(res.data.first_name)
                    const pk = res.data.pk
                    return axios.get(`https://music-mvp.herokuapp.com/api/assignments/${pk}/`, {
                        headers: {
                            Authorization: `token ${auth}`
                        }
                    })
                    .then(res => {
                        if (isMounted){
                            if (res.status === 200) {
                                console.log(res.data)
                                setLessons(res.data)
                            }
                        }
                    })
                }
            }
        })

        return () => {
            isMounted = false
        }
                

        }, [pk])

    return (
        <div>
            <header className="stu-header">
                <h3>{student.first_name} {student.last_name}</h3>
                <div className="">
                    <p><i class="bi bi-person-circle"></i> {student.username}</p>
                    <p><i class="bi bi-envelope-fill"></i> {student.email}</p>
                    <p>Emergency Contact: {student.emergency_contact_name}</p>
                    <p>Emergency Phone: {student.emergency_contact_phone}</p>
                </div>
                
            </header>
            <body className="stu-body col-xxl-12 row flex-lg-row-reverse justify-content-center">
                <div className="body-item col-lg-6">
                    <Link to="/">
                        <button className="btn btn-general">
                            Create New Lesson
                        </button>
                    </Link>
                </div>
                <div className="body-item col-lg-6">
                    {lessons.map((lesson, idx) => {
                        return (
                            <div className="card" key={idx}>
                                <div className="card-header">
                                    { lesson.plan ?
                                        <TextTruncate
                                            line={1}
                                            element="span"
                                            truncateText="…"
                                            text={lesson.plan}
                                        /> :
                                        <p>
                                            Add your lesson plan...
                                        </p>
                                    }
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{lesson.lesson_date}</h5>
                                    <Link to={`/lessons/${lesson.pk}`}> 
                                        <button className="btn btn-general">View Lesson</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </body>
        </div>
    );
}

