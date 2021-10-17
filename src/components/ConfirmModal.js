import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


export const ConfirmModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>                  */}
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

