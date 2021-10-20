import React from 'react';
import { Modal } from 'react-bootstrap';
import { EditProfile } from './EditProfile'


export const ProfileModal = ({ auth, user, instructor, setShow, toggle, setToggle, setModalTitle }) => {

    const handleClose = () => setToggle(false);

    
    return (
        <>
            <Modal show={toggle} onHide={handleClose} dialogClassName={'primary-modal'}>
                <Modal.Header closeButton>
                    <Modal.Title>Update profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProfile auth={auth} profile={user} instructor={instructor} setShow={setShow}  setModalTitle={setModalTitle} setToggle={setToggle} />
                </Modal.Body>
            </Modal>
        </>
    );
}