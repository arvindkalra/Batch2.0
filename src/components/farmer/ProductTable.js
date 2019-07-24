import React from 'react';
import Table from "react-bootstrap/Table";

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
                    <td className={'product-name ready-for-harvest'} >Gundza</td>
                    <td>04/23/19</td>
                    {/*<td>00PPQQRRSS</td>*/}
                    <td>100</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td className={'product-name harvested'} >Ruddee</td>
                    <td>04/24/19</td>
                    {/*<td>00AABBCCDD</td>*/}
                    <td>100</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td className={'product-name lab-tested'} >Tazzie</td>
                    <td>04/20/19</td>
                    {/*<td>LALA002211</td>*/}
                    <td>100</td>
                </tr>

            </tbody>

        </Table>
    );
};

export default ProductTable;
