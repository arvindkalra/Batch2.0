import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const ManufacturerActionPanel = ({ left }) => {
  return (
    <Col>
      <div className={"action-info"}>
        <h2>Action Panel</h2>
        <h3>Amount of Harvest Units Left : {left} Pounds</h3>
      </div>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Amount Of Harvest Used</Form.Label>
            <Form.Control
              type={"number"}
              placeholder={"Enter the amount harvested in pounds"}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Number Of Packets Created</Form.Label>
            <Form.Control
              type={"number"}
              placeholder={"Enter the amount harvested in pounds"}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Packet Size</Form.Label>
            <Form.Control
              type={"text"}
              placeholder={"Enter the amount harvested in pounds"}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Packet Name</Form.Label>
            <Form.Control
              type={"text"}
              placeholder={"Enter the amount harvested in pounds"}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Retailer Name</Form.Label>
            <Form.Control
              type={"text"}
              placeholder={"Enter the amount harvested in pounds"}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Transporter Name</Form.Label>
            <Form.Control
              type={"text"}
              placeholder={"Enter the amount harvested in pounds"}
            />
          </Form.Group>
        </Col>
        <Col md={12} className={'text-center'}>
          <Button type={"submit"}>Pack</Button>
        </Col>
      </Row>
    </Col>
  );
};

export default ManufacturerActionPanel;
