import React, {useState, useEffect} from 'react';
import {Table} from "react-bootstrap";
import OrderRow from "./OrderRow";

const OrderTable = ({setGrandTotal}) => {
    const [productList, setProductList] = useState([{
        id: '000001',
        productName: 'Gundza',
        distributor: 'dan the distributor',
        availableQuantity: '100',
        price: '20'
    },
        {
            id: '000002',
            productName: 'Gundza',
            distributor: 'dan the distributor',
            availableQuantity: '400',
            price: '30'
        }
    ]);
    const [total, setTotal] = useState([]);
    useEffect(() => {
        // fetch the available products and set them in the productList state
    }, []);
    const setAmount = (amount, index) => {
        total[index] = amount;

        setTotal(total);
        setGrandTotal(total)
    };

    return (
        <Table responsive>
            <thead>
            <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Distributor</th>
                <th>Quantity</th>
                <th>Available</th>
                <th>Price( $ x.xx / unit)</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
            {productList.map((product, index) => {
                return (
                    <OrderRow product={product} key={product.id} setAmount={(amount) => {
                        setAmount(amount, index)
                    }}/>
                )
            })}
            </tbody>
        </Table>
    );
};

export default OrderTable;
