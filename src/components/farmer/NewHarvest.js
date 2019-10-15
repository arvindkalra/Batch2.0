import React, { useState } from "react";
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  createTransactionModal,
  fileToString,
  setBreadcrumb
} from "../../helpers";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { checkMined, connectToWeb3 } from "../../dbController/init";
import { seedSownByFarmer } from "../../dbController/farmerRole";
import Loader from "../Loader";
import { OWN_ADDRESS } from "../../dbController/Web3Connections";
import { FormControl } from "react-bootstrap";

const NewHarvest = ({ location, history }) => {
  // Form State Variables
  const [lineage, setLineage] = useState("Durban Poison, OG Kush");

  const [floweringTime, setFloweringTime] = useState("10-20 days");
  const [plantLocation, setPlantLocation] = useState("Nursery");
  const [soilType, setSoilType] = useState("Slightly Acidic");
  const [nutrients, setNutrients] = useState("tea nutrients");
  const [seedCount, setSeedCount] = useState(0);
  const [plantName, setPlantName] = useState("tea plant");
  const [seedType, setSeedType] = useState("sinensis");
  const [plantImage, setPlantImage] = useState("");
  const [potential, setPotential] = useState(0);

  // Other State Variables
  const [transactionObject, setTransactionObject] = useState(null);
  const [transactionMining, setTransactionMining] = useState(false);
  const [clicked, setClicked] = useState(false);

  const checkAllFields = () => {
    setPlantName(plantName.captialize());
    setSeedType(seedType.captialize());
    setNutrients(nutrients.captialize());
    return (
      plantName.length !== 0 &&
      seedType.length !== 0 &&
      nutrients.length !== 0 &&
      potential > 0 &&
      seedCount > 0
    );
  };

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setClicked(true);
    if (!checkAllFields()) {
      alert("All the Fields are Required");
      return;
    }
    let objToBeUploaded = {
      lineage: lineage,
      floweringTime: floweringTime,
      currentLocation: [
        { location: plantLocation, time: new Date().toLocaleString() }
      ],
      soilType: soilType,
      nutrients: nutrients,
      datePlanted: new Date().toLocaleString(),
      seedCount: seedCount,
      plantType: seedType,
      plantName: plantName,
      plantImage: plantImage
    };
    connectToWeb3().then(() => {
      setTransactionMining(true);
      objToBeUploaded.farmerAddress = OWN_ADDRESS;
      seedSownByFarmer(objToBeUploaded, openSignatureModal).then(txHash => {
        checkMined(txHash, () => {
          history.push("/cultivator/dashboard");
        });
      });
    });
  }

  const openSignatureModal = obj => {
    setTransactionObject({
      ...obj,
      showModal: true,
      setShowModal: () => {
        setTransactionObject(null);
      },
      cancel: () => {
        setTransactionObject(null);
      }
    });
  };

  const handleImageUpload = e => {
    fileToString(e.target.files[0]).then(result => {
      setPlantImage(result);
    });
  };

  return (
    <Layout location={location} history={history}>
      <Row>
        <Col>{setBreadcrumb(location.pathname)}</Col>
      </Row>

      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <section className={"card"}>
            <div className={"card-header"}>
              <strong className="utils__title"> Register a new Plant</strong>
            </div>
            <Form>
              <Row>
                <Col md={12}>
                  {/*<Form.Group>*/}
                  {/*  <Form.Label>Seed</Form.Label>*/}
                  {/*  <Form.Control*/}
                  {/*    type={"text"}*/}
                  {/*    placeholder={"Enter the Seed Name"}*/}
                  {/*    onChange={e => setPlantName(e.target.value.captialize())}*/}
                  {/*    isInvalid={clicked ? plantName.length === 0 : false}*/}
                  {/*  />*/}
                  {/*  <FormControl.Feedback type={"invalid"}>*/}
                  {/*    <strong>Required</strong> : Enter name of the Seed*/}
                  {/*  </FormControl.Feedback>*/}
                  {/*</Form.Group>*/}
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as={'select'}
                      placeholder={"Enter the Seed Type"}
                      onChange={e => setSeedType(e.target.value)}

                    >
                      <option value="sinensis">Sinensis</option>
                      <option value="assamica">Assamica</option>
                    </Form.Control>
                    {/*<FormControl.Feedback type={"invalid"}>*/}
                    {/*  <strong>Required</strong> : Enter type of the Seed*/}
                    {/*</FormControl.Feedback>*/}
                  </Form.Group>
                </Col>
                <Col md={12}>
                  {/*<Form.Group controlId={"lineage"}>*/}
                  {/*  <Form.Label>Lineage</Form.Label>*/}
                  {/*  <Form.Control*/}
                  {/*    as={"select"}*/}
                  {/*    onChange={e => setLineage(e.target.value)}*/}
                  {/*  >*/}
                  {/*    <option value="Durban Poison, OG Kush">*/}
                  {/*      Durban Poison, OG Kush*/}
                  {/*    </option>*/}
                  {/*    <option value="line2">line2</option>*/}
                  {/*    <option value="line3">line3</option>*/}
                  {/*  </Form.Control>*/}
                  {/*</Form.Group>*/}
                </Col>
                <Col md={12}>
                  <Form.Group controlId={"flowering-time"}>
                    <Form.Label>Flowering Time</Form.Label>
                    <Form.Control
                      as={"select"}
                      onChange={e => setFloweringTime(e.target.value)}
                    >
                      <option value="1-2 years">1-2 years</option>
                      <option value="2-3 years">2-3 years</option>
                      <option value="3-4 years">3-4 years</option>
                      <option value="More than 4 years">More than 4 years</option>

                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId={"flowering-time"}>
                    <Form.Label>Current Sowing Location</Form.Label>
                    <Form.Control
                      as={"select"}
                      onChange={e => setPlantLocation(e.target.value)}
                    >
                      <option value="Nursery">Nursery</option>
                      <option value="Plantation">plantation</option>
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
                      <option value="Slightly Acidic">Slightly Acidic</option>
                      <option value="Without Calcium">
                        Without Calcium
                      </option>
                      <option value="Porous">
                        Porous
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  {/*<Form.Group>*/}
                  {/*  <Form.Label>Nutrients</Form.Label>*/}
                  {/*  <Form.Control*/}
                  {/*    type={"text"}*/}
                  {/*    placeholder={*/}
                  {/*      "Enter the Nutritional Information about the plant"*/}
                  {/*    }*/}
                  {/*    onChange={e => setNutrients(e.target.value.captialize())}*/}
                  {/*    isInvalid={clicked ? nutrients.length === 0 : false}*/}
                  {/*  />*/}
                  {/*  <FormControl.Feedback type={"invalid"}>*/}
                  {/*    <strong>Required</strong> : Enter the Nutritional*/}
                  {/*    Information*/}
                  {/*  </FormControl.Feedback>*/}
                  {/*</Form.Group>*/}
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Yield Potential</Form.Label>
                    <Form.Control as={"select"}>
                      <option value="100 Kilograms / acre">100 Kilograms / acre</option>
                      <option value="200 Kilograms / acre">200 Kilograms / acre</option>
                      <option value="300 Kilograms / acre">300 Kilograms / acre</option>
                      <option value="more than 300 Kilograms / acre">
                        More than 300 Kilograms / acre
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Average Height (in centimetres)</Form.Label>
                    <Form.Control as={"select"}>
                      <option value="50-60 centimetres">50-60 centimetres</option>
                      <option value="60-70 centimetres">60-70 centimetres</option>
                      <option value="70-80 centimetres">70-80 centimetres</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Total Potential(in grams)</Form.Label>
                    <Form.Control
                      type={"number"}
                      placeholder={"enter the total yield potential in grams"}
                      onChange={e => setPotential(parseInt(e.target.value))}
                      isInvalid={clicked ? potential <= 0 : false}
                    />
                    <FormControl.Feedback type={"invalid"}>
                      <strong>Required</strong> : Enter the Yield Potential
                    </FormControl.Feedback>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Stems Sown</Form.Label>
                    <Form.Control
                      type={"number"}
                      placeholder={"Enter the number of plant stems or seeds you have sown"}
                      onChange={e => setSeedCount(parseInt(e.target.value))}
                      isInvalid={clicked ? seedCount <= 0 : false}
                    />
                    <FormControl.Feedback type={"invalid"}>
                      <strong>Required</strong> : Enter the number of stems/seeds sown
                    </FormControl.Feedback>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Row>
                    <Col md={6}>
                      <Form.Label className={"custom-file-label"}>
                        Plant Image
                      </Form.Label>
                      <Form.Control
                        className={"custom-file-input"}
                        type={"file"}
                        placeholder={"Upload a Plant Image"}
                        onChange={handleImageUpload}
                        isInvalid={clicked ? plantImage.length === 0 : false}
                      />
                      <FormControl.Feedback type={"invalid"}>
                        <strong>Required</strong> : Upload an Image for the
                        Plant
                      </FormControl.Feedback>
                    </Col>
                    <Col md={6}>
                      <section className={"image-section"}>
                        <img
                          src={
                            plantImage ||
                            "http://support.hostgator.com/img/articles/weebly_image_sample.png"
                          }
                        />
                      </section>
                    </Col>
                  </Row>
                </Col>

                <Col md={12}>
                  <Button
                    disabled={transactionMining}
                    type={"submit"}
                    onClick={handleClick}
                  >
                    {" "}
                    Register new Harvest{" "}
                  </Button>
                </Col>
              </Row>
            </Form>
          </section>
        </Col>
      </Row>

      {transactionMining ? <Loader /> : null}
      {transactionObject ? createTransactionModal(transactionObject) : null}
    </Layout>
  );
};

export default NewHarvest;
