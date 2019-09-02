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
import { checkMined, connectToMetamask } from "../../dbController/init";
import { seedSownByFarmer } from "../../dbController/farmerRole";
import Loader from "../Loader";
import { OWN_ADDRESS } from "../../dbController/Web3Connections";
import { FormControl } from "react-bootstrap";

const NewHarvest = ({ location, history }) => {
  // Form State Variables
  const [lineage, setLineage] = useState("Durban Poison, OG Kush");

  const [floweringTime, setFloweringTime] = useState("10-20 days");
  const [plantLocation, setPlantLocation] = useState("Green House");
  const [soilType, setSoilType] = useState("Slightly Acidic");
  const [nutrients, setNutrients] = useState("");
  const [seedCount, setSeedCount] = useState(0);
  const [plantName, setPlantName] = useState("");
  const [seedType, setSeedType] = useState("");
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
      plantName: plantName,
      plantImage: plantImage,
      farmerAddress: OWN_ADDRESS
    };
    console.log(objToBeUploaded);
    connectToMetamask().then(() => {
      setTransactionMining(true);

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
    <Layout location={location}>
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
                  <Form.Group>
                    <Form.Label>Seed</Form.Label>
                    <Form.Control
                      type={"text"}
                      placeholder={"Enter the Seed Name"}
                      onChange={e => setPlantName(e.target.value)}
                      isInvalid={clicked ? plantName.length === 0 : false}
                    />
                    <FormControl.Feedback type={"invalid"}>
                      <strong>Required</strong> : Enter name of the Seed
                    </FormControl.Feedback>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      type={"text"}
                      placeholder={"Enter the Seed Type"}
                      onChange={e => setSeedType(e.target.value)}
                      isInvalid={clicked ? seedType.length === 0 : false}
                    />
                    <FormControl.Feedback type={"invalid"}>
                      <strong>Required</strong> : Enter type of the Seed
                    </FormControl.Feedback>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId={"lineage"}>
                    <Form.Label>Lineage</Form.Label>
                    <Form.Control
                      as={"select"}
                      onChange={e => setLineage(e.target.value)}
                    >
                      <option value="Durban Poison, OG Kush">
                        Durban Poison, OG Kush
                      </option>
                      <option value="line2">line2</option>
                      <option value="line3">line3</option>
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
                      <option value="10-20 weeks">10-20 weeks</option>
                      <option value="20-30 weeks">20-30 weeks</option>
                      <option value="30-40 weeks">30-40 weeks</option>
                      <option value="50-60 weeks">50-60 weeks</option>
                      <option value="60-70 weeks">60-70 weeks</option>
                      <option value="70-80 weeks">70-80 weeks</option>
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
                      <option value="Green House">Green House</option>
                      <option value="Outdoor Farm">Outdoor Farm</option>
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
                      <option value="Another Soil Type">
                        Another Soil Type
                      </option>
                      <option value="Yet Another Soil Type">
                        Yet Another Soil Type
                      </option>
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
                      isInvalid={clicked ? nutrients.length === 0 : false}
                    />
                    <FormControl.Feedback type={"invalid"}>
                      <strong>Required</strong> : Enter the Nutritional
                      Information
                    </FormControl.Feedback>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Yield Potential</Form.Label>
                    <Form.Control as={"select"}>
                      <option value="1 oz / 3 ft">1 oz / 3 ft</option>
                      <option value="2 oz / 3 ft">2 oz / 3 ft</option>
                      <option value="3 oz / 3 ft">3 oz / 3 ft</option>
                      <option value="more than 3 oz / 3 ft">
                        more than 3 oz / 3 ft
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Average Height (in Inches)</Form.Label>
                    <Form.Control as={"select"}>
                      <option value="50-60 inches">50-60 inches</option>
                      <option value="60-70 inches">60-70 inches</option>
                      <option value="70-80 inches">70-80 inches</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Total Potential(in Ounces)</Form.Label>
                    <Form.Control
                      type={"number"}
                      placeholder={"enter the total yield potential in ounces"}
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
                    <Form.Label>Seed Count</Form.Label>
                    <Form.Control
                      type={"number"}
                      placeholder={"Enter the number of seeds you have sown"}
                      onChange={e => setSeedCount(parseInt(e.target.value))}
                      isInvalid={clicked ? seedCount <= 0 : false}
                    />
                    <FormControl.Feedback type={"invalid"}>
                      <strong>Required</strong> : Enter the number of seeds sown
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
