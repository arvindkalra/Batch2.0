import React, {useState, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import {createTransactionModal, setBreadcrumb} from "../../helpers";
import {connectToMetamask} from "../../dbController/init";
import {
    getDistributorToRetailerConsignments,
    getFactoryToDistributorConsignments,
    getFarmToFactoryConsignments,
    getLabSampleConsignments, getTransporterDetails
} from "../../dbController/transporterRole";
import {getFarmerDetails} from "../../dbController/farmerRole";
import {getManufacturerDetails} from "../../dbController/manufacturerRole";
import {getLaboratoryDetails} from "../../dbController/laboratoryRole";
import {getDistributorDetails} from "../../dbController/distributorRole";
import {getRetailerDetails} from "../../dbController/retailerRole";
import ShipmentTable from "./ShipmentTable";
import Loader from "../Loader";
import {OWN_ADDRESS} from "../../dbController/Web3Connections";
import NavButton from "./NavButton";

const NewDashboard = ({location}) => {
    const [shipmentTable, setShipmentTable] = useState('pending shipments');
    const [changed, setChanged] = useState(0);
    const [harvestShipments, setHarvestShipments] = useState([]);
    const [packagedShipments, setPackagedShipments] = useState([]);
    const [harvestRowObjArr, setHarvestRowObjArr] = useState({});
    const [packageRowObjArr, setPackageObjRowArr] = useState({});
    const [sampleShipments, setSampleShipment] = useState([]);
    const [sampleRowObjArr, setSampleRowObjArr] = useState({});
    const [retailShipments, setRetailShipments] = useState([]);
    const [retailRowObjArr, setRetailRowObjArr] = useState({});
    const [transactionMining, setTransactionMining] = useState(false);
    const [transactionObject, setTransactionObject] = useState(null);
    const [loading, setLoader] = useState(true);

    const [pendingShipments, setPendingShipments] = useState([]);
    const [dispatchedShipments, setDispatchedShipments] = useState([]);
    const [deliveredShipments, setDeliveredShipments] = useState([]);
    const [tableArray, setTableArray] = useState(pendingShipments);
    const [tableType, setTableType] = useState('pending')
    const [transporterDetails, setTransporterDetails] = useState({})

    useEffect(() => {
        connectToMetamask().then(() => {

            let tempHarvestShipments = harvestShipments;
            let tempPackagedShipment = packagedShipments;
            let tempSampleShipments = sampleShipments;
            let tempRetailShipments = retailShipments;
            let tempPendingShipments = [];
            let tempDispatchedShipments = [];
            let tempDeliveredShipments = [];

            let tempChanged = changed;
            let totalHarvests = 0;
            getFarmToFactoryConsignments((row, total) => {
                totalHarvests += 1;
                let tempRow = harvestRowObjArr;
                tempRow[row.uid] = row;
                setHarvestRowObjArr(tempRow);
                let rowObj = {};
                rowObj.buid = row.uid;
                getFarmerDetails(row.details.farmerAddress).then(farmerObj => {
                    getManufacturerDetails(row.details.manufacturerAddress).then(
                        manufacturerObj => {
                            rowObj.uid = row.uid;
                            rowObj.senderCompany = farmerObj.name;
                            rowObj.receiverCompany = manufacturerObj.name;
                            rowObj.amount = row.details.totalHarvestAmount + " Pounds";
                            rowObj.dispatchTime =
                                row.details.farmToFactoryConsignmentDispatchTime;

                            rowObj.currentStatus = row.currentState;
                            rowObj.shipmentType = 'harvest';
                            rowObj.ipfsData = row;
                            tempHarvestShipments.push(rowObj);
                             if (rowObj.currentStatus.value === 8) {
                                tempDispatchedShipments.push(rowObj)
                            } else if( rowObj.currentStatus.value >= 9) {
                                tempDeliveredShipments.push(rowObj)
                            }else {
                                 tempPendingShipments.push(rowObj)
                             }
                            setPendingShipments(tempPendingShipments);
                            setTableArray(tempPendingShipments);
                            setDeliveredShipments(tempDeliveredShipments);
                            setDispatchedShipments(tempDispatchedShipments);
                            setHarvestShipments([...tempHarvestShipments]);
                            if (totalHarvests === total) {
                                setLoader(false);
                            }
                        }
                    );
                });
            });
            getLabSampleConsignments(row => {
                let tempRow = sampleRowObjArr;
                tempRow[row.uid] = row;
                setSampleRowObjArr(tempRow);
                let rowObj = {};
                let farmerName;
                getFarmerDetails(row.details.farmerAddress)
                    .then(({name}) => {
                        farmerName = name;
                        return getLaboratoryDetails(row.details.laboratoryAddress);
                    })
                    .then(({name}) => {
                        rowObj.uid = row.uid;
                        rowObj.senderCompany = farmerName;
                        rowObj.receiverCompany = name;
                        rowObj.currentStatus = row.currentState;
                        rowObj.dispatchTime =
                            row.details.labSampleConsignmentDispatchTime;
                        rowObj.shipmentType = 'sample';
                        rowObj.ipfsData = row;
                        tempSampleShipments.push(rowObj);
                        if (rowObj.currentStatus.value === 3) {
                            tempPendingShipments.push(rowObj)
                        } else if (rowObj.currentStatus.value === 4) {
                            tempDispatchedShipments.push(rowObj)
                        } else if (rowObj.currentStatus.value >= 5) {
                            tempDeliveredShipments.push(rowObj)
                        }
                        setSampleShipment([...tempSampleShipments]);
                    });
            });
            getFactoryToDistributorConsignments(row => {

                let tempRow = packageRowObjArr;
                tempRow[row.uid] = row;
                setPackageObjRowArr(tempRow);
                let rowObj = {};
                let manufacturerAddress =
                    row.details.manufacturerAddress ||
                    "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20";
                let manufacturerName;
                getManufacturerDetails(manufacturerAddress).then(({name}) => {
                    manufacturerName = name;
                    return getDistributorDetails(row.details.distributorAddress).then(
                        ({name}) => {

                            rowObj.uid = row.uid;
                            rowObj.senderCompany = manufacturerName;
                            rowObj.receiverCompany = name;
                            rowObj.currentStatus = row.currentState;
                            rowObj.dispatchTime =
                                row.details.manufacturerToDistributorDispatchTime;
                            rowObj.amount = row.details.totalPacketsManufactured;
                            tempPackagedShipment.push(rowObj);
                            rowObj.shipmentType = 'product';
                            rowObj.ipfsData = row;
                            if (rowObj.currentStatus.value === 2) {
                                tempPendingShipments.push(rowObj)
                            } else if (rowObj.currentStatus.value === 3) {
                                tempDispatchedShipments.push(rowObj)
                            } else if (rowObj.currentStatus.value >= 4) {
                                tempDeliveredShipments.push(rowObj)
                            }
                            setPackagedShipments([...tempPackagedShipment]);

                        }
                    );
                });
            });
            getDistributorToRetailerConsignments(row => {
                let tempRow = retailRowObjArr;
                tempRow[row.uid] = row;
                setRetailRowObjArr(tempRow);
                let rowObj = {};
                let distributorAddress =
                    row.details.distributorAddress ||
                    "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20";
                let distributorName;
                getDistributorDetails(distributorAddress)
                    .then(({name}) => {
                        distributorName = name;
                        return getRetailerDetails(row.details.retailerAddress);
                    })
                    .then(({name}) => {
                        rowObj.uid = row.uid;
                        rowObj.senderCompany = distributorName;
                        rowObj.receiverCompany = name;
                        rowObj.currentStatus = row.currentState;
                        rowObj.dispatchTime =
                            row.details.distributorToRetailerDispatchTime;
                        rowObj.amount = row.details.totalPacketsManufactured;
                        rowObj.shipmentType = 'retail';
                        rowObj.ipfsData = row;
                        tempRetailShipments.push(rowObj);
                        if (rowObj.currentStatus.value === 2) {
                            tempPendingShipments.push(rowObj)
                        } else if (rowObj.currentStatus.value === 3) {
                            tempDispatchedShipments.push(rowObj)
                        } else if (rowObj.currentStatus.value >= 4) {
                            tempDeliveredShipments.push(rowObj)
                        }
                        setRetailShipments([...tempRetailShipments]);

                    });
            });
            getTransporterDetails(OWN_ADDRESS).then(obj=>{
                setTransporterDetails(obj)
            })

        })
    }, []);
    return (
        <>
            <Row>
                <Col>{setBreadcrumb(location.pathname)}</Col>
            </Row>
            <Row>
                <Col md={4}>
                    <section className={'nav-buttons-section'}>
                        <ul className={'horizontal-list'}>
                            {/*<li onClick={() => {*/}
                            {/*    setTableArray(pendingShipments);*/}
                            {/*    setTableType('pending')*/}
                            {/*}}>Pending Shipments*/}
                            {/*</li>*/}
                            <NavButton html={'Pending Shipments'} setTableArray={()=>{setTableArray(pendingShipments); setTableType('pending')}} />
                            <NavButton html={'Dispatched Shipments'} setTableArray={()=>{setTableArray(dispatchedShipments); setTableType('dispatched')}} />
                            <NavButton html={'Delivered Shipments'} setTableArray={()=>{setTableArray(deliveredShipments); setTableType('delivered')}} />

                        </ul>
                    </section>
                </Col>
            </Row>
            <section className={'shipment-table-section'}>
                <Row>
                    <Col md={12}>
                        <ShipmentTable
                            transporterDetails={transporterDetails}
                            array={tableArray}
                            tableType={tableType}
                            setTransactionMining={() => {
                                setTransactionMining(true);
                            }}
                            setTransactionObject={setTransactionObject}
                        />
                    </Col>
                </Row>
            </section>
            {transactionMining ? <Loader/> : null}
            {loading ? <Loader message={"Fetching Pending Shipments"}/> : null}
            {transactionObject ? createTransactionModal(transactionObject) : null}
        </>
    );
};

export default NewDashboard;
