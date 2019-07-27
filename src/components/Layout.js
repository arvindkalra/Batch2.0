import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import {connectToMetamask} from "../dbController/init";
import {getFarmerDetails} from "../dbController/farmerRole";


const Layout = ({children}) => {


    const [farmerDetails, setFarmerDetails] = useState('');

    useEffect(() => {
        let connectedToMetaMask = localStorage.getItem("connectedToMetaMask");
        // if (!connectedToMetaMask) {
        //
        //     connectToMetamask().then(() => {
        //
        //         return getFarmerDetails()
        //     }).then(farmerObject => {
        //         setFarmerDetails(farmerObject);
        //         localStorage.setItem('connectedToMetaMask', true);
        //         console.log(connectedToMetaMask);
        //
        //         console.log(farmerObject);
        //     })
        // }

    }, []);

    return (

        <Container fluid={true}>
            <Row>
                <Col>

                    <Navbar>
                        <Navbar.Brand href="/">
                            Batch
                        </Navbar.Brand>
                        <Navbar.Collapse className={'justify-content-end'}>
                            <Navbar.Text className={'profile-name'}>Peter Williams </Navbar.Text>
                            <img src="https://picsum.photos/id/1074/50" alt="" className={'profile-image'}/>

                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>

            {children}


        </Container>
    );
};

export default Layout;
