import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Accordion, Card } from 'react-bootstrap';

export const AssignmentList = ({auth}) => {
    const [assignments, setAssignments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect( async () => {
        let isMounted = true
            
            await axios.get('https://music-mvp.herokuapp.com/api/upcoming/', {
                headers: {
                    Authorization: `token ${auth}`
                }
            })
            .then(res => {
                if (isMounted){
                    if (res.status === 200){
                        const lessons = res.data
                        let notes = []
                        lessons.forEach((lesson) => {
                            if (lesson.note.length >= 1){
                                notes.push(lesson.note[0])
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
            <Accordion defaultActiveKey="0">
                {assignments.map((assign, idx) => {
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={idx}>
                            {assign.created_at}                        
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="idx">
                            <Card.Body>{assign.body}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                })}
            </Accordion>
        </>
    );
}

