import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';


export const LessonDetAlert = ({ show, setShow }) => {
    
    useEffect(() => {
        const timeId = setTimeout(() => {

            setShow(false)
        }, 3000)
    
        return () => {
            clearTimeout(timeId)
        }
    }, []);
    
    return (
        <div>
            <Alert variant="warning" onClose={() => setShow(false)} dialogClassName="alert-save" dismissible>
                Save successful!
            </Alert>
        </div>
    );
}

