import React, {useState} from 'react';
import Layout from "../../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../../helpers";
import '../../../assets/stylesheets/App.scss'

import OrderTable from "./OrderTable";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ConfirmOrder from "./ConfirmOrder";

const CreateOrder = ({location, history}) => {
    const taxes = {
        stateSales: 3,
        stateExcise: 15,
        local: 5
    };
    const [grandTotal, setGrandTotal] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const [productList, setProductList] = useState([{
        id: '000001',
        productName: 'Gundza',
        distributor: 'dan the distributor',
        availableQuantity: '100',
        price: '20'
    },
        {
            id: '000002',
            productName: 'Gundza',
            distributor: 'dan the distributor',
            availableQuantity: '400',
            price: '30'
        }
    ]);
    const updateProduct = (index, key, value) => {
        let newProductList = productList;
         newProductList[index][key] = value;
         setProductList(newProductList)

        // setProductList(newProductList)
    }

    return (
        <Layout location={location} history={history}>
            <Row>
                <Col>{setBreadcrumb(location.pathname)}</Col>
            </Row>
            <Row>
                <Col>
                    <section className={'table-section card'}>
                        <OrderTable productList={productList} updateProduct={(index,key,value)=>{
                            updateProduct(index,key,value)
                        }}  setGrandTotal={arr => {
                            setGrandTotal(arr.reduce((a, b) => a + b, 0))
                        }}/>
                        <Row>

                            <Col md={12} className={'text-right'}>
                                <Button onClick={()=>{setShowModal(true)}}>
                                    Create Order
                                </Button>
                                <Modal size={"xl"} show={showModal} onHide={()=>{setShowModal(false)}}>
                                        <ConfirmOrder productList={productList.filter((product)=>{
                                            return product.orderedAmount
                                        })}/>

                                </Modal>
                            </Col>
                        </Row>

                    </section>

                </Col>
            </Row>

        </Layout>
    );
};

export default CreateOrder;
