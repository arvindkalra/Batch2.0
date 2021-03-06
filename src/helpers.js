import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import config from "./config";
import { convertFromHex, convertToHex } from "./dbController/init";

String.prototype.captialize = function() {
  let str = this.valueOf();
  let newstr = str.substr(0, 1).toUpperCase() + str.slice(1);
  return newstr;
};

export const setBreadcrumb = url => {
  let arr = url.split("/");

  arr.shift();
  arr = arr.map(x => x.captialize());

  let count = arr.length;
  return (
    <Breadcrumb>
      {arr.map((urlItem, index) => {
        return (
          <Breadcrumb.Item key={index} active={count === index + 1}>
            {" "}
            {urlItem}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export const createTransactionModal = ({
  from,
  to,
  functionName,
  data,
  gas,
  confirm,
  cancel,
  showModal,
  setShowModal
}) => {
  return (
    <Modal
      size={"lg"}
      show={showModal}
      onHide={() => {
        cancel();
        if (setShowModal) setShowModal(false);
      }}
      className={"transaction-sign"}
    >
      <Modal.Header>Sign Transaction</Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={3}>Function Name </Col>
          <Col md={9}>{functionName.captialize()}</Col>
        </Row>
        <Row>
          <Col md={3}>From Address </Col>
          <Col md={9}>{from}</Col>
        </Row>
        <Row>
          <Col md={3}>To Address </Col>
          <Col md={9}>{to}</Col>
        </Row>
        <Row>
          <Col md={3}>Gas Required </Col>
          <Col md={9}>{gas}</Col>
        </Row>
        <Row>
          <Col md={3}>Data :</Col>
          <Col md={9}>{data}</Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setShowModal(false);
            confirm();
          }}
          variant={"success"}
        >
          Confirm Transaction
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setShowModal(false);
            cancel();
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// TODO set seed progress for discarded
export const getSeedProgress = status => {
  switch (status) {
    case 1:
      return 20;
    case 2:
      return 50;
    case 3:
      return 60;
    case 6:
      return 80;
    case 7:
    case 8:
    case 9:
      return 100;
    case 10:
    case 11:
      return 100;
  }
};

export const getTotalFare = (sellingPrice, quantity) => {
  let amount = parseInt(sellingPrice) * parseInt(quantity);
  const stateExcise = 15;
  const stateSales = 3;
  const localTax = 5;
  if (sellingPrice === "" || quantity === "") {
    return 0;
  }
  return amount + amount * (stateExcise + stateSales + localTax) * 0.01;
};

export const setLabelsForGraphs = (item, obj) => {
  console.log(item, obj);

  const datasetIndex = item.index;
  console.log(datasetIndex);
  const data = obj.datasets[0].data[datasetIndex];
  const labelText = obj.labels[datasetIndex];
  return labelText + ": " + data + "%";
};

export const fileToString = file => {
  return new Promise((resolve, reject) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

export const clearLocal = () => {
  localStorage.setItem("name", null);
  localStorage.setItem("profileImage", null);
};

export const makeXHR = (method, route, object) => {
  let url = `${config.PURCHASE_ORDER_SERVER}/${route}`;
  let body = {
    payload: object
  };
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: object ? JSON.stringify(body) : null
  }).then(response => response.json());
};

export const createPurchaseOrderId = (purchaseOrderId, orderNumber) => {
  return `${convertToHex(purchaseOrderId)}|${orderNumber}`;
};

export const parsePurchaseOrderId = purchaseId => {
  let arr = purchaseId.split("|");
  return [convertFromHex(arr[0]), parseInt(arr[1])];
};

export function createSortFunction(keyName, type, inc) {
  let keySplit = keyName.split(".");
  let obj1 = {
    number: (a, b) => {
      return !inc
        ? b[keySplit[0]] - a[keySplit[0]]
        : a[keySplit[0]] - b[keySplit[0]];
    },
    string: (a, b) => {
      return !inc
        ? b[keySplit[0]].localeCompare(a[keySplit[0]])
        : a[keySplit[0]].localeCompare(b[keySplit[0]]);
    }
  };
  let obj2 = {
    number: (a, b) => {
      return !inc
        ? b[keySplit[0]][keySplit[1]] - a[keySplit[0]][keySplit[1]]
        : a[keySplit[0]][keySplit[1]] - b[keySplit[0]][keySplit[1]];
    },
    string: (a, b) => {
      return !inc
        ? b[keySplit[0]][keySplit[1]].localeCompare(a[keySplit[0]][keySplit[1]])
        : a[keySplit[0]][keySplit[1]].localeCompare(
            b[keySplit[0]][keySplit[1]]
          );
    }
  };
  return keySplit.length === 1 ? obj1[type] : obj2[type];
}
