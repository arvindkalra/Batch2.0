import React, {useState} from 'react';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ActionForm from "./ActionForm";

const ActionPanel = ({productState, setProductStatus}) => {
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
                    <li className={'current-status'}> Sent  Sample to Lab
                    </li>
                    <li className={'inactive'}>Send to Manufacturer</li>
                </ul>
            )

        }else if(productState === 'Lab Test Approved'){
            return(

            <ul className={'action-panel-list'}>
                <li className={'current-status'}>Sown</li>
                <li className={'current-status'}>Harvested
                </li>
                <li className={'current-status'}> Sent  Sample to Lab
                </li>
                <li className={'current-status'}>
                    Lab Test Approved
                </li>
                <li className={'active'}>Send to Manufacturer</li>
            </ul>
                )
        }else if( productState === 'Sent to Manufacturer'){
            return(

            <ul className={'action-panel-list'}>
                <li className={'current-status'}>Sown</li>
                <li className={'current-status'}>Harvested
                </li>
                <li className={'current-status'}> Sent  Sample to Lab
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
                <h2>Current Harvest Status</h2>
                {setList()}
                {productState === 'Sown' ? <Button> Move Location </Button> : null}
                {productState !== 'Sent to Manufacturer'?  <Button> Destroy !</Button>: null}
            </Col>
            <Col md={9}>
                <section className={'action-panel-form-section'}>
                    <h1>Action Panel</h1>
                    <ActionForm productState={productState} setProductStatus={(newProductStatus) => {
                        setProductStatus(newProductStatus)
                    }}/>


                </section>
            </Col>
        </>
    );
};

export default ActionPanel;
