import React, {useEffect, useState} from "react";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../../assets/stylesheets/App.scss";
import Table from "react-bootstrap/Table";
import {connectToMetamask} from "../../dbController/init";
import {getRowsForRetailer} from "../../dbController/retailerRole";
import {fetchProductUnitDetailsUsingUID} from "../../dbController/manufacturerRole";
import RetailerProductTable from "./RetailerProductTable";

const RetailerDashboard = ({location}) => {
    const [inventoryTable, setInventoryTable] = useState([]);
    const [showForMore, setShowForMore] = useState(false);
    useEffect(() => {
        connectToMetamask().then(() => {
            let tempInventory = inventoryTable;
            let tableRows = 0;
            getRowsForRetailer(row => {
                if (row.currentState.value === 4) {
                    if (tableRows < 3) {
                        tableRows++;
                        getObjectForRow(row).then(obj => {
                            if (obj) {
                                tempInventory.push(obj);
                                setInventoryTable([...tempInventory]);
                            }
                        });
                    }
                } else {
                    setShowForMore(true);
                }
            });
        });
    }, []);

    function getObjectForRow(row) {
        return new Promise((resolve, reject) => {
            let unitsAlreadySold = row.details.totalUnitsAlreadySold
                ? row.details.totalUnitsAlreadySold
                : 0;
            let left = row.details.totalUnitsForSale - unitsAlreadySold;
            if (left <= 0 || row.currentState.value !== 4) {
                resolve(null);
                return;
            }
            fetchProductUnitDetailsUsingUID(parseInt(row.details.productUnitId))
                .then(productDetails => {
                    let objToBeAdded = {
                        batchUnitId: row.batchUnitId,
                        productName: row.details.packetName,
                        left: left,
                        productType: productDetails.details.productType,
                        containerType: row.details.containerType
                    };
                    resolve(objToBeAdded);
                })
                .catch(reject);
        });
    }

    return (
        <>
            <Row>
                <Col>{setBreadcrumb(location.pathname)}</Col>
            </Row>
            <Row>
                <Col md={6}>
                    <section className={"status-tab"}>
                        <h3 className={"status-tab-title"}>Sales Targets</h3>
                        <ProgressBar now={40} label={`${40}%`}/>
                        <p className={"status-tab-description"}>
                            40% of the Sales targets met
                        </p>
                    </section>
                </Col>
                <Col md={6}>
                    <section className={"status-tab"}>
                        <h3 className={"status-tab-title"}>Inventory status</h3>
                        <ProgressBar now={80} label={`${80}%`}/>
                        <p className={"status-tab-description"}>80% of inventory cleared</p>
                    </section>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <section className={"dashboard-section"}>
                        <h3 className={"section-title"}>Inventory</h3>
                        <section className={"table-section"}>
                            <RetailerProductTable
                                rows={inventoryTable}
                                showForMore={showForMore}
                            />
                        </section>
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default RetailerDashboard;
