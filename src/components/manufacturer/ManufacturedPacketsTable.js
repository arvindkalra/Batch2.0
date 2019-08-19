import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import TableLayout from "../tables/TableLayout";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReportForm from "../laboratory/ReportForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {checkMined, connectToMetamask, OWN_ADDRESS} from "../../dbController/init";
import {sendProductToDistributor} from "../../dbController/manufacturerRole";
import Loader from "../Loader";

const ManufacturedPacketsTable = ({array, setTransactionMining}) => {
    const [showModal, setShowModal] = useState({open: false, id: 0});
    const [distributorName, setDistributorName] = useState("Distributor A");
    const [transporterName, setTransporterName] = useState("Transporter A");
    const [price, setPrice] = useState(0);

    const handleClick = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setShowModal({open: true, id: id});
    };

    const handleSend = e => {
        e.preventDefault();
        e.stopPropagation();
        setTransactionMining()

        let prevDetails = array[showModal.id].details;
        let newDetails = {
            manufacturerAddress: OWN_ADDRESS,
            distributorAddress: "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20",
            manufacturerToDistributorTransporter: "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20",
            manufacturerToDistributorPrice: price,
            sentToDistributorOn: new Date().toLocaleString()
        };
        connectToMetamask().then(() => {
            sendProductToDistributor(
                array[showModal.id].productUnitId,
                newDetails.distributorAddress,
                newDetails.manufacturerToDistributorTransporter,
                {...prevDetails, ...newDetails}
            ).then(txHash => {
                checkMined(txHash, () => window.location.reload());
            });
        });
    };
    return (
        <>
            <Table>
                <thead>
                <tr>
                    <th>Unique Id</th>
                    <th>Product Type</th>
                    <th>Units</th>
                    <th>Size</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {array.map((element, id) => {
                    return (
                        <tr key={id + "" + element.productUnitId}>
                            <td>{element.productUnitId}</td>
                            <td>{element.productType}</td>
                            <td>{element.totalPacketsManufactured}</td>
                            <td>{element.packetSize}</td>
                            <td>
                                <Button onClick={e => handleClick(e, id)}>Sell</Button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            <Modal
                show={showModal.open}
                size={"xl"}
                onHide={() => {
                    setShowModal({open: false});
                }}
            >
                <Modal.Header>Send Product To Distributor</Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Selling Price</Form.Label>
                                <Form.Control
                                    type={"number"}
                                    placeholder={"Enter the price to sell to the distributor"}
                                    onChange={e => {
                                        setPrice(parseInt(e.target.value));
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Distributor Name</Form.Label>
                                <Form.Control
                                    as={"select"}
                                    onChange={e => {
                                        setDistributorName(e.target.value);
                                    }}
                                >
                                    <option value={"Distributor A"}>Distributor A</option>
                                    <option value={"Distributor B"}>Distributor B</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Transporter Name</Form.Label>
                                <Form.Control
                                    as={"select"}
                                    onChange={e => {
                                        setTransporterName(e.target.value);
                                    }}
                                >
                                    <option value={"Transporter A"}>Transporter A</option>
                                    <option value={"Transporter B"}>Transporter B</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={"btn-success"} onClick={handleSend}>Send to Distributor</Button>
                    <Button className={"btn-danger"} onClick={() => setShowModal({open: false})}>Cancel</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default ManufacturedPacketsTable;
