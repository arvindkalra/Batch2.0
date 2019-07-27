import React from 'react';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ActionPanel = () => {
    return (<>
            <Col md={3}>
                <h2>Current Harvest Status</h2>
                <ul className={'action-panel-list'}>
                    <li className={'current-status'}>Sown</li>
                    <li className={'active'}>Harvest</li>
                    <li className={'inactive'}> Send to Lab</li>
                    <li className={'inactive'}>Send to Manufacturer</li>
                </ul>
                <Button> Move Location </Button> <Button> Destroy !</Button>
            </Col>
            <Col md={9}>
                <section className={'action-panel-form-section'}>

                the rest go here
                </section>
            </Col>
        </>
    );
};

export default ActionPanel;
