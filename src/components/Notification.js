import React from 'react';
import Toast from  'react-bootstrap/Toast';
const Notification = ({show, onClose, message}) => {
    return (
        <Toast show={show} onClose={onClose}  style={{"position": 'fixed', "top": '0', 'right': '0', 'zIndex': '2000'}} >
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
