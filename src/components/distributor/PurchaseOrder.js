import React, {useEffect, useState} from "react";
import Layout from "../Layout";
import Col from "react-bootstrap/Col";
import {makeXHR, setBreadcrumb} from "../../helpers";
import Row from "react-bootstrap/Row";
import {Card, Table} from "react-bootstrap";
import {connectToWeb3, convertFromHex} from "../../dbController/init";
import {getRetailerDetails} from "../../dbController/retailerRole";
import {fetchProductUnitDetailsUsingUID} from "../../dbController/manufacturerRole";
import Loader from "../Loader";
import OrderRow from "./OrderRow";

const PurchaseOrder = ({history, location, match}) => {
    const [viewableTableArray, setViewableTableArray] = useState([]);
    const [loader, setLoader] = useState(true);
    const [retailerDetails, setRetailerDetails] = useState({});
    const orderId = match.params.id;
    useEffect(() => {
        makeXHR(
            "GET",
            `purchase-order/get?purchaseOrder=${convertFromHex(orderId)}`
        ).then(createViewableObject);
    }, []);

    const createViewableObject = ({result}) => {

        let tempArray = viewableTableArray;
        connectToWeb3()
            .then(() => {
                return getRetailerDetails(result.retailerAddress);
            })
            .then(obj => {

                setRetailerDetails(obj);
                let i = 0;
                result.orders.forEach(item => {

                    i++;
                    fetchProductUnitDetailsUsingUID(item.productUnitId).then(
                        ({details}) => {
                            let oldUnitsUsed = details.totalPacketsUsed
                                ? details.totalPacketsUsed
                                : 0;
                            let left = details.totalPacketsManufactured - oldUnitsUsed;
                            let objToAdd = {
                                productId: item.productUnitId,
                                productName: details.productName,
                                orderedQuantity: item.amount,
                                available: left,
                                price: details.distributorToRetailerPrice,
                                unTouchedDetail: details,
                                orderNum: item.orderNumber,
                                currentState: item.currentState
                            };
                            console.log(objToAdd);
                            tempArray.push(objToAdd);
                            setViewableTableArray([...tempArray]);
                            if (i === result.orders.length) {
                                setLoader(false);
                            }
                        }
                    );
                });
            });
    };

    return (
        <>
            <Layout history={history} location={location}>
                <Row>
                    <Col>{setBreadcrumb(location.pathname)}</Col>
                </Row>
                <Row>
                    <Col md={12}>

                        <Card>
                            <Row>

                                <Col md={12}>
                                    <h1 className={'text-center title'}> Purchase Order</h1>
                                    <br/>
                                </Col>
                                <Col md={6}>

                                    <h4>

                                        <strong>Business Name: {retailerDetails.companyName}</strong>
                                        <br/>
                                        Contact Person: {retailerDetails.name}
                                    </h4>
                                    <address>
                                        {retailerDetails.address}
                                        <br/>
                                        <abbr title={"License Number"}>License:</abbr>{" "}
                                        {retailerDetails.licenseNumber || 'Unavailable'}
                                        <br/>
                                        <abbr title={"License Type"}>Type:</abbr> {retailerDetails.licenseType}
                                    </address>
                                </Col>

                                <Col md={12}>
                                    <section className={'table-section'}>
                                        <Table responsive>
                                            <thead>
                                            <tr>
                                                <th>Product Id</th>
                                                <th>Product Name</th>

                                                <th>Ordered Quantity</th>
                                                <th>Available Quantity</th>
                                                <th>Price( $ x.xx / unit)</th>
                                                <th>Total($)</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            {viewableTableArray.map((item, index) => {
                                                return (
                                                    <OrderRow item={item} key={index} purchaseOrderId={orderId}/>
                                                )
                                            })}
                                            </tbody>
                                        </Table>
                                    </section>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Layout>
            {loader ? <Loader message={"Fetching Data..."}/> : null}

        </>
    );
};

export default PurchaseOrder;
