import React, {useState} from 'react';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ActionForm from "./ActionForm";

const ActionPanel = ({productState, setProductStatus, seedObj}) => {
    const [showForm, setShowForm] = useState(false);

    const setList = () => {
        if (productState === 'Sown') {
            return (

                <ul className={'action-panel-list'}>
                    <li className={'current-status'}>Sown</li>
                    <li className={'active'} onClick={() => {
                        setShowForm(true)
                    }}> Fill Harvest Report
                    </li>
                    <li className={'inactive'}>Harvest</li>
                    <li className={'inactive'}>Send to Manufacturer</li>
                </ul>
            )
        } else if (productState === 'Harvested') {
            return (

                <ul className={'action-panel-list'}>
                    <li className={'current-status'}>Sown</li>
                    <li className={'current-status'}> Harvest Report Submitted
                    </li>
                    <li className={'active'} onClick={() => {
                        setShowForm(true)
                    }}> Send Sample to Lab
                    </li>
                    <li className={'inactive'}>Send to Manufacturer</li>
                </ul>
            )
        } else if (productState === 'Sent to Lab') {
            return (
                <ul className={'action-panel-list'}>
                    <li className={'current-status'}>Sown</li>
                    <li className={'current-status'}>Harvested
                    </li>
                    <li className={'current-status'}> Sent Sample to Lab
                    </li>
                    <li className={'inactive'}>Send to Manufacturer</li>
                </ul>
            )

        } else if (productState === 'Lab Test Approved') {
            return (

                <ul className={'action-panel-list'}>
                    <li className={'current-status'}>Sown</li>
                    <li className={'current-status'}>Harvested
                    </li>
                    <li className={'current-status'}> Sent Sample to Lab
                    </li>
                    <li className={'current-status'}>
                        Lab Test Approved
                    </li>
                    <li className={'active'}>Send to Manufacturer</li>
                </ul>
            )
        } else if (productState === 'Sent to Manufacturer') {
            return (

                <ul className={'action-panel-list'}>
                    <li className={'current-status'}>Sown</li>
                    <li className={'current-status'}>Harvested
                    </li>
                    <li className={'current-status'}> Sent Sample to Lab
                    </li>
                    <li className={'current-status'}>
                        Lab Test Approved
                    </li>
                    <li className={'current-status'}>Sent to Manufacturer</li>
                </ul>
            )
        }
    };
    return (<>
            <Col md={3}>
                <section className={'action-panel-list-section'}>


                    <section>
                        <h3> Primary Actions</h3>
                        {setList()}
                    </section>
                    <section className={'secondary-actions-section'}>
                        <h3>Secondary Actions</h3>
                        {productState === 'Sown' ?
                            <Button className={'btn-warning move-location'}> MOVE LOCATION </Button> : null}
                        {productState !== 'Sent to Manufacturer' ?
                            <Button className={'btn-danger destroy-crop'}> DESTROY CROP</Button> : null}
                    </section>
                </section>
            </Col>
            <Col md={9}>
                <section className={'action-panel-form-section'}>
                    <h1>Action Panel</h1>
                    <ActionForm seedObj={seedObj} productState={productState} setProductStatus={(newProductStatus) => {
                        setProductStatus(newProductStatus)
                    }}/>


                </section>
            </Col>
        </>
    );
};

export default ActionPanel;
