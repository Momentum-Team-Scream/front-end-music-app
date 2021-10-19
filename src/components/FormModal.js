import React from 'react';
import { Modal } from 'react-bootstrap';
import { LessonForm } from './LessonForm'


export const FormModal = ({ auth, setSubmitted, setShow, toggle, setToggle, setModalTitle }) => {

    const handleClose = () => setToggle(false);
    // const handleShow = () => setShow(true);

    
    return (
        <>
            <Modal show={toggle} onHide={handleClose} dialogClassName={'primary-modal'}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Lesson</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LessonForm auth={auth} setSubmitted={setSubmitted} setShow={setShow}  setModalTitle={setModalTitle} />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className='btn btn-gray'>
                        Cancel
                    </button>                              
                </Modal.Footer>
            </Modal>
        </>
    );
}