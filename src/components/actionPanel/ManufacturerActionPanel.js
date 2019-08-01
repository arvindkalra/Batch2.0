import React, {useState} from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import {packetsManufactured} from "../../dbController/manufacturerRole";

const ManufacturerActionPanel = ({left, total, prevDetails}) => {

    const [materialUsed, setMaterialUsed] = useState('1');
    const [packetsMade, setPacketsMade] = useState('10');
    const [packetSize, setPacketSize] = useState('1.75g');
    const [packetName, setPacketName] = useState('gummy');
    const [productType, setProductType] = useState('preroll2')
    const [retailerName, setRetailerName] = useState('');
    const [transporterName, setTransporterName] = useState('');

    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
        let packetObj = {}
        packetObj.packetSize = packetSize;
        packetObj.packetName = packetName;
        packetObj.productType = productType;
        packetObj.packedOn = new Date().toDateString;

        packetsManufactured(prevDetails.uid, parseInt(packetsMade), parseInt(materialUsed), '0x627306090abaB3A6e1400e9345bC60c78a8BEf57', '0x627306090abaB3A6e1400e9345bC60c78a8BEf57', packetObj).then(console.log)
    };


    return (
        <Col>
            <div className={"action-info"}>
                <h2>Action Panel</h2>
            </div>
            <Row>
                <Col md={12}>
                    <Form.Group>
                        <Form.Label>Units of Raw Material Left For Use</Form.Label>
                        <ProgressBar
                            now={(left / total) * 100}
                            label={`${left} Pounds`}
                            striped
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Units of Raw Material Used</Form.Label>
                        <Form.Control
                            type={"number"}
                            placeholder={"Enter the amount harvested in pounds"}
                            onChange={e => {
                                setMaterialUsed(e.target.value)
                            }}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Number Of Packets Manufactured</Form.Label>
                        <Form.Control
                            type={"number"}
                            placeholder={"Enter the amount harvested in pounds"}
                            onChange={e => {
                                setPacketsMade(e.target.value)
                            }}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Packet Size</Form.Label>
                        <Form.Control
                            type={"text"}
                            placeholder={"Enter the amount harvested in pounds"}
                            onChange={e => {
                                setPacketSize(e.target.value)
                            }}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>
                            Product Type
                        </Form.Label>
                        <Form.Control  type={'text'} placeholder={'enter the product type'}  onChange={e =>{ setProductType(e.target.value)}} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Packet Name</Form.Label>
                        <Form.Control
                            type={"text"}
                            placeholder={"Enter the amount harvested in pounds"}
                            onChange={e => {
                                setPacketName(e.target.value)
                            }}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Retailer Name</Form.Label>
                        <Form.Control
                            as={'select'}
                            placeholder={"Enter the amount harvested in pounds"}
                            onChange={e => {
                                setRetailerName(e.target.value)
                            }}
                        >
                            <option value="">abcd</option>
                            <option value="">efgh</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={{span:6 ,offset:3}}>
                    <Form.Group>
                        <Form.Label>Transporter Name</Form.Label>
                        <Form.Control
                            as={'select'}
                            placeholder={"Enter the amount harvested in pounds"}
                            onChange={e => {
                                setTransporterName(e.target.value)
                            }}
                        >
                            <option value="">abcd</option>
                            <option value="">efgh</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={12} className={"text-center"}>
                    <Button type={"submit"} onClick={handleClick}>Pack</Button>
                </Col>
            </Row>
        </Col>
    );
};

export default ManufacturerActionPanel;
