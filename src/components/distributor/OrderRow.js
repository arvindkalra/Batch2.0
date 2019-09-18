import React, {useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import Loader from "../Loader";
import config from "../../config";
import {createTransactionModal, makeXHR, parsePurchaseOrderId} from "../../helpers";
import {createBatchByDistributor} from "../../dbController/distributorRole";
import {checkMined} from "../../dbController/init";

const OrderRow = ({item, purchaseOrderId}) => {

    const [transactionMining, setTransactionMining] = useState(false);
    const [transactionObject, setTransactionObject] = useState(null);
    const [itemState, setItemState] = useState('loading');


    useEffect(() => {
        const available = parseFloat(item.available);
        const orderedQuantity = parseFloat(item.orderedQuantity);
        if (item.currentState === 'Completed') {
            setItemState('completed')

        } else {
            if (available >= orderedQuantity) {

                setItemState('can be full filled')

            } else {
                setItemState('can not be full filled')
            }
        }

    });
    const handleClick = e => {
        setTransactionMining(true);
        handleSale()


    };
    const setAction = state => {
        switch (state) {
            case 'can be full filled':
                return <Button onClick={handleClick}> Full-fill order </Button>;
            case 'can not be full filled':
                return <span>You do not have sufficient quantity to full-fill this order</span>;
            case 'completed':
                return <span>Order Completed</span>;
            default:
                return <span>Loading</span>

        }
    };
    const handleSale = () => {
        let batchObject = {
            totalUnitsForSale: item.orderedQuantity,
            sentToRetailerOn: new Date().toLocaleString(),
            productUnitId: item.productId,
            distributorAddress: config.ADDRESS,
            distributorToRetailerTransporter: config.ADDRESS,
            retailerAddress: config.ADDRESS
        };
        let newProductDetail = item.unTouchedDetail;
        let oldUnitsUsed = newProductDetail.totalPacketsUsed
            ? newProductDetail.totalPacketsUsed
            : 0;
        newProductDetail.totalPacketsUsed =
            parseInt(oldUnitsUsed) + batchObject.totalUnitsForSale;


        setTransactionMining(true);

        createBatchByDistributor(
            batchObject.productUnitId,
            newProductDetail,
            batchObject,
            batchObject.retailerAddress,
            batchObject.distributorToRetailerTransporter,
            purchaseOrderId,
            item.orderNum,
            openSignatureModal
        ).then(hash => {
            checkMined(hash, () => {
                makeXHR("POST", "completeOrder", {transactionHash: hash}).then(() => {

                    window.location.reload()
                });
            });
        });
    };


    const openSignatureModal = obj => {
        setTransactionObject({
            ...obj,
            showModal: true,
            setShowModal: () => {
                setTransactionObject(null);
            },
            cancel: () => {
                setTransactionMining(false);
                setTransactionObject(null);
            }
        });
    };


    return (
        <>
            <tr>
                <td>
                    {item.productId}
                </td>
                <td>
                    {item.productName}
                </td>
                <td>
                    {item.orderedQuantity}
                </td>
                <td>
                    {item.available}
                </td>
                <td>
                    {item.price}
                </td>
                <td>
                    {parseFloat(item.price) * parseFloat(item.orderedQuantity)}
                </td>
                <td>
                    {setAction(itemState)}

                </td>
            </tr>
            {transactionObject ? createTransactionModal(transactionObject) : null}
            {transactionMining ? <Loader/> : null}
        </>
    );
};

export default OrderRow;
