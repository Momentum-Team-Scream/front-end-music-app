import React from 'react';
import { Modal } from 'react-bootstrap';


export const ConfirmModal = ({ show, setShow }) => {

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    
    return (
        <>
            <Modal show={show} onHide={handleClose} dialogClassName={'primary-modal'}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Submitted!</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className='btn btn-alert'>
                        Close
                    </button>                              
                </Modal.Footer>
            </Modal>
        </>
    );
}

