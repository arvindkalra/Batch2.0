import React,{useState} from 'react';
import Modal from "react-bootstrap/Modal";
import ReportForm from "../laboratory/ReportForm";
import Button from "react-bootstrap/Button";



const FormModal = ({buttonText}) => {
const [showModal, setShowModal] = useState(false)
    return (
        <>
            <Button onClick={()=>{setShowModal(true)}} >{buttonText} </Button>
            <Modal show={showModal} size={'xl'} onHide={()=>{setShowModal(false)}}>

                <Modal.Body>
                    <ReportForm/>

                </Modal.Body>
            </Modal>

        </>
    );
};

export default FormModal;
