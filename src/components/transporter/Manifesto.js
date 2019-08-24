import React, {useState, useEffect} from 'react';
import {Container, Row, Table} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {getTransporterDetails} from "../../dbController/transporterRole";
import {OWN_ADDRESS} from "../../dbController/Web3Connections";

const Manifesto = ({rowObj, item,transporterDetails}) => {
    console.log(item);
    useEffect(() => {
        setManifesto(item)
    }, [item]);
    const [deliveryTime, setDeliveryTime] = useState('');
    const [dispatchTime, setDispatchTime] = useState('');
    const setManifesto = (item) => {

        switch (item.shipmentType) {
            case 'sample':
                setDeliveryTime(item.ipfsData.details.labSampleConsignmentDeliveryTime.split(',')[0]);
                setDispatchTime(item.ipfsData.details.labSampleConsignmentDispatchTime.split(',')[0]);
                return;
            case 'harvest':
                setDeliveryTime(item.ipfsData.details.farmToFactoryConsignmentDeliveryTime.split(',')[0]);
                setDispatchTime(item.ipfsData.details.farmToFactoryConsignmentDispatchTime.split(',')[0]);
                return;
            case 'retail':
                setDeliveryTime(item.ipfsData.details.distributorToRetailerDeliveryTime.split(',')[0]);
                setDispatchTime(item.ipfsData.details.distributorToRetailerDispatchTime.split(',')[0]);
                return;
            default:
                setDeliveryTime('new date');
                setDispatchTime('new date');
                return


        }

    };

    return (
        <Container>
             <section className={'manifesto-header-section'}>
                 <Row>
                     <Col md={12} className={'center-align-text'}>
                         <h4>
                         <span>{transporterDetails.companyName}</span>
                         </h4>
                     </Col>

                     <Col md={12}>

                     </Col>
                 </Row>

            </section>
            <section className={'product-details-section'}>

            <Row>
                <Col md={{span: 4}} className={'product-info-tab'}>
                    <h2>Item Type</h2>
                    <p>
                        {item.shipmentType}
                    </p>
                </Col>
                <Col md={4} className={'product-info-tab'}>
                    <h2>Dispatched On</h2>
                    <p>
                        {dispatchTime}

                    </p>
                </Col>
                <Col md={4} className={'product-info-tab'}>
                    <h2>Delivered On</h2>
                    <p>
                        {deliveryTime}

                    </p>
                </Col>


            </Row>
            </section>

            <section className={'manifesto-details-section'}>
                <Row>
                    <Col md={12}>
                        <ul className={'manifesto-list'}>
                            <li>
                                <h2>
                                Originating Entity:
                                </h2>
                                <ul>
                                    <li>Company Name:   <span>Farmer company name</span> </li>
                                    <li>Address <span>Farmer address</span> </li>
                                </ul>
                            </li>
                            <li>
                                <h2>
                                Destination:
                                </h2>
                                <ul>
                                    <li>Company Name:   <span>Farmer company name</span> </li>
                                    <li>Address <span>Farmer address</span> </li>
                                </ul>
                            </li>
                            <li>
                                <h2>
                                Transporter:
                                </h2>
                                <ul>
                                    <li>Company Name:   <span>Farmer company name</span> </li>
                                    <li>Address <span>Farmer address</span> </li>
                                </ul>

                            </li>

                        </ul>

                    </Col>
                    <Col md={12}>
                        <h1 className={'title'}>
                            Cargo Details
                        </h1>
                        <Table responsive>
                            <thead >
                            <tr>
                                <th>
                                    Product Name
                                </th>
                                <th>
                                    Product Label Number(if Any)
                                </th>
                                <th>
                                    Weight/ Quanitity
                                </th>
                                <th>
                                    Delivery Cost
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    Harvest Sample
                                </td>
                                <td>
                                    #LA-420
                                </td>
                                <td>
                                    1 pound
                                </td>
                                <td>
                                    $120
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <span> Print Manifesto <i className="fas fa-download"></i> </span>
                    </Col>

                </Row>

            </section>
        </Container>
    );
};

export default Manifesto;


// currentStatus: {value: 10, status: "Test Failed"}
// dispatchTime: "23/08/2019, 18:55:43"
// ipfsData:
//     currentOwner: "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20"
// currentState: {value: 10, status: "Test Failed"}
// details:
//     cannabinoids: 99
// cbd: 88
// currentLocation: "Green House"
// datePlanted: "21/08/2019, 13:56:09"
// farmToLabConsignmentTransporterAddress: "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20"
// farmerAddress: "0x7949173e38cef39e75e05d2d2c232fbe8bae5e20"
// floweringTime: "10-20 days"
// harvestTime: "21/08/2019, 13:56:27"
// labSampleConsignmentDeliveryTime: "23/08/2019, 19:08:28"
// labSampleConsignmentDispatchTime: "23/08/2019, 18:55:43"
// laboratoryAddress: "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20"
// lineage: "line1"
// nutrients: "laskdjfi"
// physicalReport: ""
// plantName: "Gundza"
// seedCount: 123412
// sentToLabOn: "Wed Aug 21 2019"
// soilType: "Slightly Acidic"
// testedOn: "23/08/2019, 23:06:43"
// thc: 45
// totalHarvestAmount: 565
// __proto__: Object
// uid: 16
// __proto__: Object
// receiverCompany: "Nick Fury"
// senderCompany: "Iron Man"
// shipmentType: "sample"
// uid: 16
// __proto__: Object
