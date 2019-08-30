import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ActionForm from "./ActionForm";

const ActionPanel = ({ productState, setProductStatus, seedObj, history }) => {
  const [showForm, setShowForm] = useState(false);
  const [destroyRequested, setDestroyRequested] = useState(false);
  const [moveRequested, setMoveRequested] = useState(false);

  const setList = () => {
    if (productState.value === 1) {
      return (
        <ul className={"action-panel-list"}>
          <li className={"current-status"}>Sown</li>
          <li
            className={"active"}
            onClick={() => {
              setShowForm(true);
            }}
          >
            {" "}
            Fill Harvest Report
          </li>
          <li className={"inactive"}>Harvest</li>
          <li className={"inactive"}>Send to Manufacturer</li>
        </ul>
      );
    } else if (productState.value === 2) {
      return (
        <ul className={"action-panel-list"}>
          <li className={"current-status"}>Sown</li>
          <li className={"current-status"}> Harvest Report Submitted</li>
          <li
            className={"active"}
            onClick={() => {
              setShowForm(true);
            }}
          >
            {" "}
            Send Sample to Lab
          </li>
          <li className={"inactive"}>Send to Manufacturer</li>
        </ul>
      );
    } else if (productState.value >= 3 && productState.value < 6) {
      return (
        <ul className={"action-panel-list"}>
          <li className={"current-status"}>Sown</li>
          <li className={"current-status"}>Harvested</li>
          <li className={"current-status"}> Sent Sample to Lab</li>
          <li className={"inactive"}>Send to Manufacturer</li>
        </ul>
      );
    } else if (productState.value === 6) {
      return (
        <ul className={"action-panel-list"}>
          <li className={"current-status"}>Sown</li>
          <li className={"current-status"}>Harvested</li>
          <li className={"current-status"}> Sent Sample to Lab</li>
          <li className={"current-status"}>Lab Test Approved</li>
          <li className={"active"}>Send to Manufacturer</li>
        </ul>
      );
    } else if (productState.value >= 7 && productState.value <= 9) {
      return (
        <ul className={"action-panel-list"}>
          <li className={"current-status"}>Sown</li>
          <li className={"current-status"}>Harvested</li>
          <li className={"current-status"}> Sent Sample to Lab</li>
          <li className={"current-status"}>Lab Test Approved</li>
          <li className={"current-status"}>Sent to Manufacturer</li>
        </ul>
      );
    } else if (productState.value === 10) {
      return (
        <ul className={"action-panel-list"}>
          <li className={"inactive"}>Sown</li>
          <li className={"inactive"}>Harvested</li>
          <li className={"inactive"}> Sent Sample to Lab</li>
          <li className={"inactive"}>Lab Test Rejected</li>
        </ul>
      );
    }
  };

  const handleDestroy = e => {
    e.preventDefault();
    e.stopPropagation();
    setDestroyRequested(true);
  };

  const handleMove = e => {
    e.preventDefault();
    e.stopPropagation();
    setMoveRequested(true);
  };

  return (
    <>
      <Col md={3}>

        <section className={"action-panel-list-section card"}>
          <section>
            <h3> Primary Actions</h3>
            {setList()}
          </section>
          <section className={"secondary-actions-section"}>
            <h3>Secondary Actions</h3>
            <div>
              {productState.value === 1 ? (
                <Button
                  className={"btn-warning move-location"}
                  onClick={handleMove}
                >
                  {" "}
                  MOVE LOCATION{" "}
                </Button>
              ) : null}
              {productState.value < 7 ? (
                <Button
                  className={"btn-danger destroy-crop"}
                  onClick={handleDestroy}
                >
                  {" "}
                  DESTROY CROP
                </Button>
              ) : null}

              {productState.value === 10 ? (
                <Button
                  className={"btn-danger destroy-crop"}
                  onClick={handleDestroy}
                >
                  {" "}
                  DESTROY CROP
                </Button>
              ) : null}
            </div>
          </section>
        </section>
      </Col>
      <Col md={9}>
        <section className={"action-panel-form-section card"}>
          <h1>Action Panel</h1>
          <ActionForm
            history={history}
            seedObj={seedObj}
            productState={productState}
            setProductStatus={newProductStatus => {
              setProductStatus(newProductStatus);
            }}
            destroyRequested={destroyRequested}
            cancelDestroyRequest={() => {
              setDestroyRequested(false);
            }}
            moveRequested={moveRequested}
            cancelMoveRequested={() => {
              setMoveRequested(false);
            }}
          />
        </section>
      </Col>
    </>
  );
};

export default ActionPanel;
