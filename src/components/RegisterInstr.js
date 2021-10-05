import React, { useState } from 'react';
import axios from 'axios';

export const RegisterInstructor = () => {
    const [firstName, setFirstName] = useState('')
    
    const handleChange = (inputType, event) => {
        if (inputType === 'firstName'){
            setFirstName(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('form submitted!')
    }

    console.log(firstName)

    return (
        <>
            <form className='form register-form' onSubmit={handleSubmit}>
                <label className="label">First Name</label>
                <input
                    className="input form-control"
                    type="text"
                    aria-label="first name"
                    aria-required="true"
                    value={firstName}
                    onChange={(event) => handleChange('firstName', event)}
                />
                <button type="submit" className="btn btn-dark">Register</button>
            </form>
        </>
    );
}


