import React,{useState} from 'react';
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";
import Product from "./Product";
const ProductTable = () => {

    const [showModal, setShowModal] = useState(false);
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
                    <td className={'product-name ready-for-harvest'}  > <Link to={'/farmer/products/6'} > Gundza </Link>  </td>
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
            <Modal show={showModal} onHide={() =>{setShowModal(false)}} dialogClassName={"product-modal"}>
                <Modal.Header closeButton>
                    <Modal.Title>

                    <h1> Gundza</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Product/>
                </Modal.Body>

            </Modal>

        </Table>
    );
};

export default ProductTable;
