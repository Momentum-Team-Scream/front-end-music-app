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
                                console.log(typeof res.data)
                                const lessons = res.data
                                let upLessons = []
                                let paLessons = []
                                console.log(lessons)
                                lessons.forEach((lesson) => {
                                    let lesDate = lesson.lesson_date
                                    console.log(Date.parse(lesDate))
                                    if (Date.parse(lesDate) >= Date.parse(today)) {
                                        upLessons.push(lesson)
                                    } else 
                                        paLessons.push(lesson)
                                })
                                console.log(upLessons)
                                console.log(paLessons)
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

    // console.log(lessons)
    console.log(date[0])
    
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
                    <h4>Today is {today}</h4>
                    <Link to="/">
                        <button className="btn btn-general">
                            Create New Lesson
                        </button>
                    </Link>
                </div>
                {/* <div className="body-item col-lg-6">
                    <h3>Upcoming Lessons</h3>
                    {lessons.map((lesson, idx) => {
                        return (
                            <>
                                { lesson.date >= date[0] ? 
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
                                    </> :
                                    null
                                }
                            </>
                        )
                    })}
                </div> */}
            </body>
        </div>
    );
}

