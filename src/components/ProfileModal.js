import React from 'react';
import { Modal } from 'react-bootstrap';
import { EditProfile } from './EditProfile'


export const ProfileModal = ({ auth, user, setShow, toggle, setToggle, setModalTitle }) => {

    const handleClose = () => setToggle(false);

    
    return (
        <>
            <Modal show={toggle} onHide={handleClose} dialogClassName={'primary-modal'}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Lesson</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProfile auth={auth} profile={user} setShow={setShow}  setModalTitle={setModalTitle} />
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