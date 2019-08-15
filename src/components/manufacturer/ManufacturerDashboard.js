import React, {useEffect, useState} from "react";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import Row from "react-bootstrap/Row";
import AvailableRawMaterialTable from "./AvailableRawMaterialTable";
import ManufacturedPacketsTable from "./ManufacturedPacketsTable";
import ManufacturerBarGraph from "./ManufacturerBarGraph";
import {fetchHarvestUnitsByManufacturer} from "../../dbController/manufacturerRole";
import {connectToMetamask} from "../../dbController/init";
import {getFarmerDetails} from "../../dbController/farmerRole";
import BarGraph from "../farmer/graphs/dashboard/BarGraph";

const ManufacturerDashboard = ({location}) => {
    const [availableArray, setAvailableArray] = useState([]);
    const [packetsReadyForDispatch, setPacketsReadyForDispatch] = useState([]);
    const [availableGraphData, setAvailableGraphData] = useState({});
    const [
        packetsManufacturedGraphData,
        setPacketsManufacturedGraphData
    ] = useState({});
    useEffect(() => {
        connectToMetamask().then(() => {
            fetchHarvestUnitsByManufacturer(harvestObject => {

                let tempAvailableArray = availableArray;
                let rowArray = [];
                rowArray.push(harvestObject.uid);
                getFarmerDetails(harvestObject.farmerAddress).then(farmerObject => {
                    console.log(harvestObject);
                    rowArray.push(farmerObject.name);
                    rowArray.push(harvestObject.details.totalHarvestAmount);
                    rowArray.push(harvestObject.details.plantName);
                    let harvestUsed = harvestObject.details.totalHarvestUsed ? harvestObject.details.totalHarvestUsed : 0;
                    let leftAmount = harvestObject.details.totalHarvestAmount - harvestUsed;
                    tempAvailableArray.push(rowArray);
                    setAvailableArray([...tempAvailableArray]);
                    addToAvailableGraphData(harvestObject.details.plantName, leftAmount);
                });
            });
        });
    }, []);

    function addToAvailableGraphData(plantName, availability) {
        let tempBarObject = availableGraphData;
        if (tempBarObject[plantName]) {
            let old = tempBarObject[plantName];
            tempBarObject[plantName] = old + availability;
        } else {
            tempBarObject[plantName] = availability;
        }
        console.log(tempBarObject);
        setAvailableGraphData(tempBarObject);
    }

    // let getDataForManufacturer = () => {
    //     setAvailableArray([
    //         [1, "Pokemon", 100, "Gundza"],
    //
    //         [2, "Pokemon", 100, "Gundza"],
    //         [3, "Pokemon", 100, "Gundza"]
    //     ]);
    //
    //     setPacketsReadyForDispatch([
    //         [1, "Preroll", "Gummy Bear", "1.75g"],
    //         [1, "Preroll", "Gummy Bear", "1.75g"],
    //
    //         [1, "Preroll", "Gummy Bear", "1.75g"]
    //     ]);
    //     setAvailableGraphData({
    //         Gondza: 1000,
    //         Tazie: 500,
    //         Sansa: 750,
    //         Skypey: 800
    //     });
    //     setPacketsManufacturedGraphData({
    //         Preroll: 2000,
    //         Edible: 1200,
    //         Patches: 800
    //     });
    // };

    return (
        <>
            <Row>
                <Col>{setBreadcrumb(location.pathname)}</Col>
            </Row>

            {/*Graph showing available raw material*/}
            <Row>
                <Col md={6}>
                    <section className={"manufacturer-graph dashboard-section"}>
                        <h3 className={'section-title'}>Available Raw Material</h3>
                        <BarGraph ObjectToShow={availableGraphData}/>
                    </section>
                </Col>
                <Col md={6}>
                    <section className={"report-table-section dashboard-section"}>
                        <h3 className={'section-title'}>Available Raw Material</h3>
                        <AvailableRawMaterialTable array={availableArray}/>
                    </section>
                </Col>
            </Row>

            {/*Two tables for available raw material and packets made ready for dispatch*/}
            <Row>
                <Col md={6}>
                    <section className={"report-table-section dashboard-section"}>
                        <h3 className={'section-title'}>Created Packets</h3>
                        <ManufacturedPacketsTable array={packetsReadyForDispatch}/>
                    </section>
                </Col>
                <Col md={6}>
                    <section className={"manufacturer-graph dashboard-section"}>
                        <h3 className={'section-title'}>Products Manufactured in 2018-19</h3>
                        <ManufacturerBarGraph data={packetsManufacturedGraphData}/>
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default ManufacturerDashboard;
