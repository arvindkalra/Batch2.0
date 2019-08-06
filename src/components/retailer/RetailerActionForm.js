import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {getConsumerDetails, sellPacketsToBuyer} from "../../dbController/retailerRole";

const RetailerActionForm = ({puid}) => {

    const [address, setAddress] = useState('0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
    const [amount, setAmount] = useState('5');
    const [sellingPrice, setSellingPrice] = useState('10');
    const [tax, setTax] = useState('2');

    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
        getConsumerDetails(address).then(obj => {
            console.log(obj);
            obj.purchases.push({puid, amount, sellingPrice, tax, purchasedOn: new Date().toDateString()});
            sellPacketsToBuyer(puid, address, amount, obj).then(txHash => {
                console.log(txHash)
            })
        })


    };

    return (
        <Form>
            <Row>
                <Col md={12}>
                    <Form.Group controlId={'buyer'}>
                        <Form.Label>
                            Buyer Address
                        </Form.Label>
                        <Form.Control type={'text'} placeholder={'Enter the Consumer\'s ethereum address'}
                                      onChange={e => {
                                          setAddress(e.target.value)
                                      }}/>
                    </Form.Group>

                </Col>
                <Col md={12}>
                    <Form.Group controlId={'amount'}>
                        <Form.Label>
                            Amount
                        </Form.Label>
                        <Form.Control type={'number'} placeholder={'Enter the Quantity you want to Sell'}
                                      onChange={e => {
                                          setAmount(e.target.value)
                                      }}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={'price'}>
                        <Form.Label>
                            Selling Price
                        </Form.Label>
                        <Form.Control type={'number'} placeholder={'Enter the selling price'} onChange={e => {
                            setSellingPrice(e.target.value)
                        }}/>
                    </Form.Group>

                    <Form.Group controlId={'tax'}>
                        <Form.Label>
                            Tax Amount
                        </Form.Label>
                        <Form.Control type={'number'} placeholder={'Enter the tax collected'} onChange={e => {
                            setTax(e.target.value)
                        }}/>

                    </Form.Group>

                </Col>
                <Col md={12}>
                    <Button type={'submit'} onClick={handleClick}>Confirm Sale </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default RetailerActionForm;
