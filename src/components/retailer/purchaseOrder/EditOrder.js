import React, {useEffect, useState} from 'react';
import Layout from "../../Layout";
import Col from "react-bootstrap/Col";
import {makeXHR, setBreadcrumb} from "../../../helpers";
import Row from "react-bootstrap/Row";
import {connectToWeb3, convertFromHex} from "../../../dbController/init";
import {Table} from "react-bootstrap";
import {fetchRowsForCreatingPurchaseOrder} from "../../../dbController/retailerRole";

const EditOrder = ({history, location, match}) => {
    const [orderList, setOrderList] = useState([]);

    const orderId = match.params.id;
    useEffect(() => {
        makeXHR('GET', `purchase-order/get?purchaseOrder=${convertFromHex(orderId)}`
        ).then(({result}) => {
            console.log(result);
            setOrderList(result.orders);

            connectToWeb3().then(()=>{
                fetchRowsForCreatingPurchaseOrder('0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20',(row)=>{
                    console.log(row)
                 let x =result.orders.find(ele =>{

                     console.log(ele)
                        return(ele.productUnitId === row.uid)
                    })
                    console.log(x)
                })
            })

        })

    }, []);

    return (
        <Layout history={history} location={location}>
            <Row>
                <Col>{setBreadcrumb(location.pathname)}</Col>
            </Row>
            <Row>
                <Col>
                    <section className={'table-section card'}>
                        <Table>
                            <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Distributor</th>
                                <th>Quantity</th>
                                <th>Available</th>
                                <th>Price( $ x.xx / unit)</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                        </Table>

                    </section>
                </Col>
            </Row>

        </Layout>
    );
};

export default EditOrder;
