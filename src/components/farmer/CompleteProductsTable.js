import React,{useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Table from "react-bootstrap/Table";
import {getRowsForFarmer} from "../../dbController/farmerRole";
import {connectToMetamask} from "../../dbController/init";

const CompleteProductsTable = () => {
    const [rows, setRows]  =useState([])
    useEffect(()=> {
        connectToMetamask().then(()=>{
            let tempRows = rows;
        getRowsForFarmer((rowObj)=>{
            tempRows.push(rowObj);
            setRows(tempRows);
            console.log(rows)

        })

        })
    },[])


    return (
        <Table responsive>
            <thead>
            <tr>
                <th>
                    #
                </th>
                <th>
                    Product Name
                </th>
                <th>
                    Date Planted
                </th>
                {/*<th>*/}
                {/*    Batch #*/}
                {/*</th>*/}
                <th>
                    Quantity
                </th>
                <th>
                    Current Status
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td ><Link to={'/farmer/products/6'}> Gundza </Link></td>
                <td>04/23/19</td>
                {/*<td>00PPQQRRSS</td>*/}
                <td>100</td>
                <td>
                    Sown
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td >Ruddee</td>
                <td>04/24/19</td>
                {/*<td>00AABBCCDD</td>*/}
                <td>100</td>
                <td>
                    Sent To lab
                </td>
            </tr>
            <tr>
                <td>3</td>
                <td className={'product-name lab-tested'}>Tazzie</td>
                <td>04/20/19</td>
                {/*<td>LALA002211</td>*/}
                <td>100</td>
                <td>
                    sent to manufacturer
                </td>
            </tr>
            <tr>
                <td>1</td>
                <td className={'product-name ready-for-harvest'}><Link to={'/farmer/products/6'}> Gundza </Link></td>
                <td>04/23/19</td>
                {/*<td>00PPQQRRSS</td>*/}
                <td>100</td>
                <td>
                    Sown
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td className={'product-name harvested'}>Ruddee</td>
                <td>04/24/19</td>
                {/*<td>00AABBCCDD</td>*/}
                <td>100</td>
                <td>
                    Sent To lab
                </td>
            </tr>
            <tr>
                <td>3</td>
                <td className={'product-name lab-tested'}>Tazzie</td>
                <td>04/20/19</td>
                {/*<td>LALA002211</td>*/}
                <td>100</td>
                <td>
                    sent to manufacturer
                </td>
            </tr>
            <tr>
                <td>1</td>
                <td className={'product-name ready-for-harvest'}><Link to={'/farmer/products/6'}> Gundza </Link></td>
                <td>04/23/19</td>
                {/*<td>00PPQQRRSS</td>*/}
                <td>100</td>
                <td>
                    Sown
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td className={'product-name harvested'}>Ruddee</td>
                <td>04/24/19</td>
                {/*<td>00AABBCCDD</td>*/}
                <td>100</td>
                <td>
                    Sent To lab
                </td>
            </tr>
            <tr>
                <td>3</td>
                <td className={'product-name lab-tested'}>Tazzie</td>
                <td>04/20/19</td>
                {/*<td>LALA002211</td>*/}
                <td>100</td>
                <td>
                    sent to manufacturer
                </td>
            </tr>

            </tbody>



        </Table>
    );
};

export default CompleteProductsTable;
