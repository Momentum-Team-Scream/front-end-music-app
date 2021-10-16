import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TextTruncate from 'react-text-truncate';
import '../styles/studetail.css'

export const StudentDetail = ({auth, props}) => {
    const [student, setStudent] = useState({})
    const [upcomingLessons, setUpcomingLessons] = useState([])
    const [pastLessons, setPastLessons] = useState([])
    const [pk, setPk] = useState('')
    const date = useState([new Date()]);
    const today = String(date[0]).slice(0, 16);

    useEffect( async () => {
        let isMounted = true

        const newArr = props.location.pathname.split('/');
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
                    setStudent(res.data)
                    const pk = res.data.pk
                    return axios.get(`https://music-mvp.herokuapp.com/api/assignments/${pk}/`, {
                        headers: {
                            Authorization: `token ${auth}`
                        }
                    })
                    .then(res => {
                        if (isMounted){
                            if (res.status === 200) {
                                const lessons = res.data
                                console.log(res.data)
                                let upLessons = []
                                let paLessons = []
                                lessons.forEach((lesson) => {
                                    let lesDate = lesson.lesson_date
                                    if (Date.parse(lesDate) >= Date.parse(today)) {
                                        upLessons.push(lesson)
                                    } else 
                                        paLessons.push(lesson)
                                })
                                setUpcomingLessons(upLessons)
                                setPastLessons(paLessons)
                                
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
            <body className="stu-body col-xxl-12 row flex-lg-row justify-content-center">
                <div className="body-item col-lg-6">
                    <h3>Upcoming Lessons</h3>
                    {upcomingLessons.map((lesson, idx) => {
                        return (
                            <>
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
                                                No plan added...
                                            </p>
                                        }
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{lesson.lesson_date}</h5>
                                        <Link to={`/lessons/${lesson.pk}`}> 
                                            <button className="btn btn-general">Edit Lesson Plan</button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className="body-item col-lg-6">
                    <h4>Today is {today}</h4>
                    <Link to="/">
                        <button className="btn btn-general">
                            Create New Lesson
                        </button>
                    </Link>
                    <div>
                        <h3>Past Lesson Plans:</h3>
                            {pastLessons.map((plesson, idx) => {
                                return (
                                        <div className="card" key={idx}>
                                            <div className="card-header">
                                                <p>{plesson.lesson_date}</p>
                                            </div>
                                            <div className="card-body">
                                                <p>{plesson.plan}</p>
                                            </div>
                                        </div>
                                )
                            })} 
                    </div>
                </div>
            </body>
        </div>
    );
}

