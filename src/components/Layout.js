import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import SideBar from "./SideBar";
import '../assets/stylesheets/layout.scss';


const Layout = ({children}) => {


    const [farmerDetails, setFarmerDetails] = useState('');
    const [showSideBar, setShowSideBar] = useState(false);
    const [overlayDisplay,setOverlayDisplay] = useState('none');
    const closeSideBar= () => {
        setShowSideBar(false);
        setOverlayDisplay('none');
    }
    const toggleSideBar = (e)=> {
        e.preventDefault();
        e.stopPropagation();
        setShowSideBar(true);
        setOverlayDisplay('block');

    }



    return (

        <Container fluid={true}>
            {showSideBar? <SideBar closeSideBar={closeSideBar} />:null}

            <Row>
                <Col>

                    <Navbar>
                        <Button onClick={toggleSideBar} className={'sidebar-toggle-button'} > <span className="navbar-toggler-icon"></span>  </Button>
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
            <div className={'overlay'} style={{display:overlayDisplay}} >

            </div>
            {children}



        </Container>
    );
};

export default Layout;
