import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";

const ManufacturerActionPanel = ({ left, total, prevDetails }) => {
  return (
    <Col>
      <div className={"action-info"}>
        <h2>Action Panel</h2>
      </div>
      <Row>
        <Col md={12}>
          <Form.Group>
            <Form.Label>Units of Raw Material Left For Use</Form.Label>
            <ProgressBar
              now={(left / total) * 100}
              label={`${left} Pounds`}
              striped
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Units of Raw Material Used</Form.Label>
            <Form.Control
              type={"number"}
              placeholder={"Enter the amount harvested in pounds"}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Number Of Packets Manufactured</Form.Label>
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
        <Col md={12} className={"text-center"}>
          <Button type={"submit"}>Pack</Button>
        </Col>
      </Row>
    </Col>
  );
};

export default ManufacturerActionPanel;
