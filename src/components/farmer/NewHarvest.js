import React, { useState } from "react";
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {createTransactionModal, fileToString, setBreadcrumb} from "../../helpers";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { checkMined, connectToMetamask } from "../../dbController/init";
import { seedSownByFarmer } from "../../dbController/farmerRole";
import Notification from "../Notification";
import Loader from "../Loader";
import { OWN_ADDRESS } from "../../dbController/Web3Connections";

const NewHarvest = ({ location, history }) => {
  const [lineage, setLineage] = useState("line1");
  const [floweringTime, setFloweringTime] = useState("10-20 days");
  const [plantLocation, setPlantLocation] = useState("Green House");
  const [soilType, setSoilType] = useState("Slightly Acidic");
  const [seed, setSeed] = useState('')
  const [nutrients, setNutrients] = useState("abcd, def ,ghi");
  const [seedCount, setSeedCount] = useState("450");
  const [plantName, setPlantName] = useState("Gundza");
  const [transactionMining, setTransactionMining] = useState(false);
  const [transactionObject, setTransactionObject] = useState(null);
  const [plantImage, setPlantImage] = useState('')
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
      plantImage: plantImage,
      farmerAddress: OWN_ADDRESS
    };
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

      const imagePath = result;

      setPlantImage(imagePath);
    })

  };

  return (
    <Layout location={location}>
      <Row>
        <Col>{setBreadcrumb(location.pathname)}</Col>
      </Row>
      <section className={"new-harvest-form-section"}>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Form>
              <Row>
                <Col md={12}>
                  <h1> Register a new Plant </h1>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      Seed
                    </Form.Label>
                    <Form.Control type={'text'} placeholder={'enter the seed name'} onChange={e => setPlantName(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>

                    Type
                    </Form.Label>
                    <Form.Control type={'text'} placeholder={'enter the seed type'} />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group controlId={"lineage"}>
                    <Form.Label>Lineage</Form.Label>
                    <Form.Control
                      as={"select"}
                      onChange={e => setLineage(e.target.value)}
                    >
                      <option value="Durban Poison, OG Kush">Durban Poison, OG Kush</option>
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
                  <Form.Group >
                    <Form.Label>
                      Yield Potential
                    </Form.Label>
                    <Form.Control as={'select'}>
                      <option value="1 oz / 3 ft">1 oz / 3 ft</option>
                      <option value="2 oz / 3 ft">2 oz / 3 ft</option>
                      <option value="3 oz / 3 ft">3 oz / 3 ft</option>
                      <option value="more than 3 oz / 3 ft">more than 3 oz / 3 ft</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      Average Height (in Inches)
                    </Form.Label>
                    <Form.Control as={'select'}>
                      <option value="50-60 inches">50-60 inches</option>
                      <option value="60-70 inches">60-70 inches</option>
                      <option value="70-80 inches">70-80 inches</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      Total Potential(in Ounces)
                    </Form.Label>
                    <Form.Control type={'number'} placeholder={'enter the total yield potential in ounces'} />
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

                {/*<Col md={12}>*/}
                {/*  <Form.Group>*/}
                {/*    <Form.Label>Plant Name</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*      as={"select"}*/}
                {/*      onChange={e => setPlantName(e.target.value)}*/}
                {/*    >*/}
                {/*      <option value="Gundza">Gundza</option>*/}
                {/*      <option value="Ruddee">Ruddee</option>*/}
                {/*      <option value="Tazzie">Tazzie</option>*/}
                {/*      <option value="Sansa">Sansa</option>*/}
                {/*      <option value="Skypey">Skypey</option>*/}
                {/*    </Form.Control>*/}
                {/*  </Form.Group>*/}
                {/*</Col>*/}
                <Col md={12}>
                  <Row>
                    <Col md={6}>
                      <Form.Label className={'custom-file-label'}>
                        Plant Image
                      </Form.Label>
                      <Form.Control className={'custom-file-input'} type={'file'}
                                    placeholder={'Upload a Plant Image'}
                                    onChange={handleImageUpload}

                      />
                    </Col>
                    <Col md={6}>
                      <section className={'image-section'}>
                        <img src={plantImage ||'http://support.hostgator.com/img/articles/weebly_image_sample.png'}/>
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
          </Col>
        </Row>
      </section>
      {transactionMining ? <Loader /> : null}
      {transactionObject ? createTransactionModal(transactionObject) : null}
    </Layout>
  );
};

export default NewHarvest;
