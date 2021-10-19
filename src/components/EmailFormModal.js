import React from 'react';
import { Modal } from 'react-bootstrap';
import { StudentRegEmailForm } from './StudentRegEmailForm.js';


export const EmailFormModal = ({ auth, pk, setSubmitted, show, setShow, toggle, setToggle, setModalTitle }) => {
    console.log(pk)
    const handleClose = () => setToggle(false);
    // const handleShow = () => setShow(true);

    
    return (
        <>
            <Modal show={toggle} onHide={handleClose} dialogClassName={'primary-modal'}>
                <Modal.Header closeButton>
                    <Modal.Title>New Student Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StudentRegEmailForm auth={auth} pk={pk} setSubmitted={setSubmitted} setShow={setShow}  setModalTitle={setModalTitle} />
                </Modal.Body>
            </Modal>
        </>
    );
}