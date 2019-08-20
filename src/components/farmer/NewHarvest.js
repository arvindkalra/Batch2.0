import React, {useState} from "react";
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
    checkMined,
    connectToMetamask,
    OWN_ADDRESS
} from "../../dbController/init";
import {seedSownByFarmer} from "../../dbController/farmerRole";
import Notification from "../Notification";
import Loader from "../Loader";

const NewHarvest = ({location, history}) => {
    const [lineage, setLineage] = useState("line1");
    const [floweringTime, setFloweringTime] = useState("10-20 days");
    const [plantLocation, setPlantLocation] = useState("Green House");
    const [soilType, setSoilType] = useState("Slightly Acidic");
    const [nutrients, setNutrients] = useState("abcd, def ,ghi");
    const [seedCount, setSeedCount] = useState("450");
    const [plantName, setPlantName] = useState("Gundza");
    const [transactionMining, setTransactionMining] = useState(false);


    function handleClick(e) {

        e.preventDefault();
        e.stopPropagation();
        let objToBeUploaded = {
            lineage: lineage,
            floweringTime: floweringTime,
            currentLocation: plantLocation,
            soilType: soilType,
            nutrients: nutrients,
            datePlanted: new Date().toLocaleString(),
            seedCount: seedCount,
            plantName: plantName,
            farmerAddress: OWN_ADDRESS
        };
        connectToMetamask().then(() => {
            setTransactionMining(true);


            seedSownByFarmer(objToBeUploaded).then(txHash => {
                checkMined(txHash, () => {
                    history.push('/cultivator/dashboard');


                });
            });
        });
    }

    return (
        <Layout location={location}>
            <Row>
                <Col>{setBreadcrumb(location.pathname)}</Col>
            </Row>
            <section className={"new-harvest-form-section"}>
                <Row>
                    <Col md={{span: 8, offset: 2}}>
                        <Form>
                            <Row>
                                <Col md={12}>
                                    <h1> Register a new Plant </h1>
                                </Col>

                                <Col md={12}>
                                    <Form.Group controlId={"lineage"}>
                                        <Form.Label>Lineage</Form.Label>
                                        <Form.Control
                                            as={"select"}
                                            onChange={e => setLineage(e.target.value)}
                                        >
                                            <option value="">line1</option>
                                            <option value="">line2</option>
                                            <option value="">line3</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId={"flowering-time"}>
                                        <Form.Label>Flowering Time</Form.Label>
                                        <Form.Control
                                            as={"select"}
                                            onChange={e => setFloweringTime(e.target.value)}
                                        >
                                            <option value="">10-20 days</option>
                                            <option value="">20-30 days</option>
                                            <option value="">30-40 days</option>
                                            <option value="">50-60 days</option>
                                            <option value="">60-70 days</option>
                                            <option value="">70-80 days</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId={"flowering-time"}>
                                        <Form.Label>Where is the Plant Sowed</Form.Label>
                                        <Form.Control
                                            as={"select"}
                                            onChange={e => setPlantLocation(e.target.value)}
                                        >
                                            <option value="">Green House</option>
                                            <option value="">Outdoor Farm</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Soil Type</Form.Label>
                                        <Form.Control
                                            as={"select"}
                                            onChange={e => setSoilType(e.target.value)}
                                        >
                                            <option value="">Slightly Acidic</option>
                                            <option value="">Another Soil Type</option>
                                            <option value="">Yet Another Soil Type</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Nutrients</Form.Label>
                                        <Form.Control
                                            type={"text"}
                                            placeholder={
                                                "Enter the Nutritional Information about the plant"
                                            }
                                            onChange={e => setNutrients(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Seed Count</Form.Label>
                                        <Form.Control
                                            type={"number"}
                                            placeholder={"Enter the number of seeds you have sown"}
                                            onChange={e => setSeedCount(parseInt(e.target.value))}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Plant Name</Form.Label>
                                        <Form.Control
                                            as={"select"}
                                            onChange={e => setPlantName(e.target.value)}
                                        >
                                            <option value="Gundza">Gundza</option>
                                            <option value="Ruddee">Ruddee</option>
                                            <option value="Tazzie">Tazzie</option>
                                            <option value="Sansa">Sansa</option>
                                            <option value="Skypey">Skypey</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col md={12}>
                                    <Button disabled={transactionMining} type={"submit"} onClick={handleClick}>
                                        {" "}
                                        Register new Harvest{" "}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </section>
            {transactionMining ? <Loader/> : null}
        </Layout>
    );
};

export default NewHarvest;
