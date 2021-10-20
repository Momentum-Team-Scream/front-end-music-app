import React from 'react';
import { Modal } from 'react-bootstrap';
import birdtextright from '../birds/birdtextright.png'


export const ConfirmModal = ({ show, setShow, modalTitle }) => {

    const handleClose = () => setShow(false);

    
    return (
        <>
            <Modal show={show} onHide={handleClose} dialogClassName={'primary-modal'}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className="modal-img" src={birdtextright} alt="helpful-bird"></img>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className='btn btn-general'>
                        Close
                    </button>                              
                </Modal.Footer>
            </Modal>
        </>
    );
}

