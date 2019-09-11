import React,{useState} from 'react';
import Layout from "../../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../../helpers";
import '../../../assets/stylesheets/App.scss'

import OrderTable from "./OrderTable";
const CreateOrder = ({location, history}) => {
    const taxes = {
        stateSales: 3,
        stateExcise: 15,
        local:5
    }
    const [grandTotal, setGrandTotal] = useState(0)

    return (
        <Layout location={location} history={history}>
            <Row>
                <Col>{setBreadcrumb(location.pathname)}</Col>
            </Row>
            <Row>
                <Col>
                    <section className={'table-section card'}>
                        <OrderTable setGrandTotal={arr => {
                            setGrandTotal(arr.reduce((a,b)=> a+b,0))
                        }} />
                        <Row>
                            <Col md={12} className={"text-right"}>
                                <p>
                                    Sub - Total Amount: <strong>$ {grandTotal}</strong>
                                </p>
                                <p>
                                    State Excise (15%): <strong>$ {grandTotal*taxes.stateExcise/100} </strong>
                                </p>
                                <p>
                                    State Sales Tax (3%): <strong>$ {grandTotal*taxes.stateSales/100}</strong>
                                </p>
                                <p>
                                    Local Tax (5%): <strong>$ {grandTotal*taxes.local/100}</strong>
                                </p>
                                <p>
                                    Grand Total: <strong>$ {grandTotal +grandTotal*taxes.stateExcise/100 +grandTotal*taxes.stateSales/100+ grandTotal*taxes.local/100 }</strong>
                                </p>
                            </Col>
                        </Row>

                    </section>

                </Col>
            </Row>

        </Layout>
    );
};

export default CreateOrder;
