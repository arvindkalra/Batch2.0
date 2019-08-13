import React from 'react';
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";

const ProductTable = () => {


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
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td className={'product-name ready-for-harvest'}><Link to={'/farmer/products/6'}> Gundza </Link></td>
                <td>04/23/19</td>
                {/*<td>00PPQQRRSS</td>*/}
                <td>100</td>
            </tr>
            <tr>
                <td>2</td>
                <td className={'product-name harvested'}>Ruddee</td>
                <td>04/24/19</td>
                {/*<td>00AABBCCDD</td>*/}
                <td>100</td>
            </tr>
            <tr>
                <td>3</td>
                <td className={'product-name lab-tested'}>Tazzie</td>
                <td>04/20/19</td>
                {/*<td>LALA002211</td>*/}
                <td>100</td>
            </tr>

            </tbody>
            <ul className={'table-links-list'}>
                <li>
                    <Link to={'/farmer/add-new-harvest'}> Add a new harvest</Link>
                </li>
                <li>
                    <Link to={'/all-products'}>See all harvests </Link>
                </li>
            </ul>


        </Table>
    );
};

export default ProductTable;
