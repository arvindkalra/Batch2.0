import React from 'react';
import Toast from  'react-bootstrap/Toast';
const Notification = ({show, onClose, message}) => {
    return (
        <Toast show={show} onClose={onClose}   >
            <Toast.Header>
                <small>Notification</small>
            </Toast.Header>
            <Toast.Body>
                {message}
            </Toast.Body>
        </Toast>
    );
};

export default Notification;
