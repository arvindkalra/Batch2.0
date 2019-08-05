import React, {useEffect, useState} from "react";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import Row from "react-bootstrap/Row";
import HarvestShipmentTable from "./HarvestShipmentTable";
import PackagedShipmentTable from "./PackagedShipmentTable";
import {getTransportUnitDetails} from "../../dbController/transporterRole";
import {connectToMetamask} from "../../dbController/init";
import {getFarmerDetails} from "../../dbController/farmerRole";
import {getManufacturerDetails} from "../../dbController/manufacturerRole";
import {getRetailerDetails} from "../../dbController/retailerRole";

const TransporterDashboard = ({location}) => {
    const [harvestShipments, setHarvestShipments] = useState([]);
    const [packagedShipments, setPackagedShipments] = useState([]);
    const [harvestRowObjArr, setHarvestRowObjArr] = useState({});
    const [packageRowObjArr, setPackageObjRowArr] = useState({});
    useEffect(() => {
        connectToMetamask().then(() => {
            let tempHarvestShipments = harvestShipments;
            let tempPackagedShipment = packagedShipments;
            getTransportUnitDetails(true, (row) => {
                let tempRow = harvestRowObjArr;
                tempRow[row.uid] = row;
                setHarvestRowObjArr(tempRow);
                let rowObj = {};
                rowObj.buid = row.uid;
                getFarmerDetails(row.senderAddress).then((farmerObj) => {
                    getManufacturerDetails(row.receiverAddress).then((manufacturerObj) => {
                        if(row.currentState === 'delivered'){
                            return;
                        }
                        rowObj.senderCompany = farmerObj.name;
                        rowObj.receiverCompany = manufacturerObj.name;
                        rowObj.amount = row.amount;
                        rowObj.dispatchTime = row.details.dispatchTime;

                        rowObj.currentStatus = row.currentState === 'sent' ? 'packed' : row.currentState;
                        tempHarvestShipments.push(rowObj);
                        setHarvestShipments([...tempHarvestShipments]);
                    })
                })


            });
            getTransportUnitDetails(false, (row) => {
                console.log(row);
                // amount: 10
                // currentState: "packed"
                let tempRow = packageRowObjArr;
                tempRow[row.uid] = row;
                setPackageObjRowArr(tempRow);
                let rowObj = {};
                rowObj.puid = row.uid;
                getManufacturerDetails(row.senderAddress).then(manufacturerObj => {
                    getRetailerDetails(row.receiverAddress).then(retailerObj => {
                        if(row.currentState === 'delivered' || row.currentState === 'lost'){
                            return;
                        }
                        rowObj.senderCompany = manufacturerObj.name;
                        rowObj.receiverCompany = retailerObj.name;
                        rowObj.amount = row.amount + ' Units';
                        rowObj.currentStatus = row.currentState;
                        rowObj.dispatchTime = row.details.dispatchTime;

                        tempPackagedShipment.push(rowObj);
                        setPackagedShipments([...tempPackagedShipment]);
                    });
                });
            });
        });
    }, []);


    // let getDataForTransporter = () => {
    //   setPackagedShipments([
    //     {
    //       puid: 1,
    //       senderCompany: "Bob the Builder",
    //       receiverCompany: "Cannabis Supply",
    //       amount: 100,
    //       currentStatus: "packed"
    //     },
    //     {
    //       puid: 2,
    //       senderCompany: "Bob the Builder",
    //       receiverCompany: "Cannabis Supply",
    //       amount: 115,
    //       currentStatus: "dispatched",
    //       dispatchTime: "1st May"
    //     },
    //     {
    //       puid: 3,
    //       senderCompany: "Bob the Builder",
    //       receiverCompany: "Cannabis Supply",
    //       amount: 100,
    //       currentStatus: "dispatched",
    //       dispatchTime: "5th May"
    //     }
    //   ]);
    // };

    return (
        <>
            <Row>
                <Col>{setBreadcrumb(location.pathname)}</Col>
            </Row>

            {/*Tables for showing current shipments*/}
            <Row>
                <Col>
                    <section className={"shipment-section"}>
                        <h3>Current Shipments (Harvests)</h3>
                        <HarvestShipmentTable array={harvestShipments} rowObjArr={harvestRowObjArr}/>
                    </section>
                </Col>
            </Row>
            <Row>
                <Col>
                    <section className={"shipment-section"}>
                        <h3>Current Shipments (Packets)</h3>
                        <PackagedShipmentTable array={packagedShipments} rowObjArr={packageRowObjArr}/>
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default TransporterDashboard;
