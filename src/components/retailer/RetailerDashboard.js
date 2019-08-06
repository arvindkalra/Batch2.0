import React from 'react';
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import '../../assets/stylesheets/App.scss';
import Table from "react-bootstrap/Table";

const RetailerDashboard = ({location}) => {
    return (
        <>
            <Row>
                <Col>{setBreadcrumb(location.pathname)}</Col>

            </Row>
            <Row>
                <Col md={6}>
                    <section className={'status-tab'}>
                        <h3 className={'status-tab-title'}>
                            Sales Targets
                        </h3>
                        <ProgressBar now={40} label={`${40}%`}/>
                        <p className={'status-tab-description'}>
                            40% of the Sales targets met
                        </p>

                    </section>
                </Col>
                <Col md={6}>
                    <section className={'status-tab'}>
                        <h3 className={'status-tab-title'}>
                            Inventory status</h3>
                        <ProgressBar now={80} label={`${80}%`}/>
                        <p className={'status-tab-description'}>
                            80% of inventory cleared
                        </p>
                    </section>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <section className={'dashboard-section'}>
                        <h3 className={'section-title'}>
                            Inventory
                        </h3>
                        <section className={'table-section'}>
                    <Table>
                        <thead>
                        <tr>
                            <th>
                                Batch Id

                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                                Size
                            </th>
                            <th>
                                Container
                            </th>
                            <th>
                                S/N
                            </th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                00AABBCCDD
                            </td>
                            <td>
                                Preroll
                            </td>
                            <td>
                                3000
                            </td>
                            <td>
                                Box
                            </td>
                            <td>
                                129249252
                            </td>
                        </tr>
                        <tr>
                            <td>
                                00AABBCCDD
                            </td>
                            <td>
                                Preroll
                            </td>
                            <td>
                                3000
                            </td>
                            <td>
                                Box
                            </td>
                            <td>
                                129249252
                            </td>
                        </tr>
                        <tr>
                            <td>
                                00AABBCCDD
                            </td>
                            <td>
                                Preroll
                            </td>
                            <td>
                                3000
                            </td>
                            <td>
                                Box
                            </td>
                            <td>
                                129249252
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                        <p className={'see-all'}>  <a href={'/'}>See Complete Inventory</a> </p>
                        </section>
            </section>
                </Col>
            </Row>

        </>
    );
};

export default RetailerDashboard;
