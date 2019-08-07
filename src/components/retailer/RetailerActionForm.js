import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import '../../assets/stylesheets/retailer.scss'
import {getConsumerDetails, sellPacketsToBuyer} from "../../dbController/retailerRole";
import {checkMined} from "../../dbController/init";
import QRCode from "qrcode.react";
import {getTotalFare} from "../../helpers";

const RetailerActionForm = ({puid}) => {
    const [address, setAddress] = useState(
        ""
    );
    const [amount, setAmount] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [tax, setTax] = useState("2");
    const [showQrCodeModal, setShowQrCodeModal] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState('');

    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
        getConsumerDetails(address).then(obj => {
            console.log(obj);
            obj.purchases.push({
                puid,
                amount,
                sellingPrice,
                tax,
                purchasedOn: new Date().toDateString()
            });
            sellPacketsToBuyer(puid, address, amount, obj).then(txHash => {
                checkMined(txHash, () => {
                    setShowQrCodeModal(true);
                    setQrCodeValue('This is supposed to be the url');
                })
            });
        });
    };

    return (
        <>
            <Row>
                <Col md={6}>
                    <Form>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId={"buyer"}>
                                    <Form.Label>Buyer Address</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        placeholder={"Enter the Consumer's ethereum address"}
                                        onChange={e => {
                                            setAddress(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group controlId={"amount"}>
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control
                                        type={"number"}
                                        placeholder={"Enter the Quantity you want to Sell"}
                                        onChange={e => {
                                            setAmount(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={"price"}>
                                    <Form.Label>Selling Price</Form.Label>
                                    <Form.Control
                                        type={"number"}
                                        placeholder={"Enter the selling price"}
                                        onChange={e => {
                                            setSellingPrice(e.target.value);
                                        }}
                                    />
                                </Form.Group>

                                {/*<Form.Group controlId={"tax"}>*/}
                                {/*  <Form.Label>Tax Amount</Form.Label>*/}
                                {/*  <Form.Control*/}
                                {/*    type={"number"}*/}
                                {/*    placeholder={"Enter the tax collected"}*/}
                                {/*    onChange={e => {*/}
                                {/*      setTax(e.target.value);*/}
                                {/*    }}*/}
                                {/*  />*/}
                                {/*</Form.Group>*/}
                            </Col>
                            <Col md={12}>
                                <Button type={"submit"} onClick={handleClick}>
                                    Confirm Sale{" "}
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                </Col>
                <Col md={6}>
                    <section className={'retail-receipt-section'}>
                        <Row>
                            <Col md={12}>
                                <h1> ABC Pvt Limited </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <ul>
                                    <li>
                                        Buyer: <span> {address}</span>
                                    </li>
                                    <li>
                                        Product: <span>Prerolls</span>
                                    </li>
                                    <li>
                                        Quantity: <span>{amount} units</span>
                                    </li>
                                    <li>
                                        Price : <span>${sellingPrice}</span>
                                    </li>
                                    <li>
                                        <ul>
                                            <h6>Tax</h6>

                                            <li>
                                                State Excise : <span>15%</span>
                                            </li>
                                            <li>
                                                State Sales Tax: <span>3%</span>

                                            </li>
                                            <li>
                                                Local Tax: <span>5%</span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Total : <span>${getTotalFare(sellingPrice, amount)} </span>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{span: 6, offset: 2}}>
                                SCAN THIS QR CODE TO SEE DETAILS:
                            </Col>
                            <Col md={{span: 4}}>
                                <QRCode bgColor={'#6e7480'} fgColor={'white'} value={qrCodeValue} size={185}/>
                            </Col>
                        </Row>
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default RetailerActionForm;
