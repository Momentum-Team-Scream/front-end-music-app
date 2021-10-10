import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const Assignmentlist = ({auth}) => {
    const [assignments, setAssignments] = useState([])

    useEffect(() => {
        let isMounted = true
            
            axios.get('https://music-mvp.herokuapp.com/api/upcoming/', {
                headers: {
                    Authorization: `token ${auth}`
                }
            })
            .then(res => {
                if (isMounted){
                    if (res.status === 200){
                        let lessons = res.data
                        let notes = []
                        lessons.forEach((lesson) => {
                            if (lesson.note.length >= 1){
                                notes.push(lesson.note)
                            }
                        })
                        setAssignments(notes)
                    }
                }
            })

            return () => {
                isMounted = false
            }
                    

        }, [auth])
    
    console.log(assignments)

    return (
        <>
            Assignments will load here
        </>
    );
}

