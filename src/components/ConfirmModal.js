import React from 'react';
import { Modal } from 'react-bootstrap';
import birdtextright from '../birds/birdtextright.png'


export const ConfirmModal = ({ show, setShow }) => {

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    
    return (
        <>
            <Modal show={show} onHide={handleClose} dialogClassName={'primary-modal'}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Submitted!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className="modal-img" src={birdtextright} alt="helpful-bird"></img>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className='btn btn-alert'>
                        Close
                    </button>                              
                </Modal.Footer>
            </Modal>
        </>
    );
}

