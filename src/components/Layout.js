import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import "../assets/stylesheets/layout.scss";

const Layout = ({ children, userName, profileImage, location }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [overlayDisplay, setOverlayDisplay] = useState("none");

  const closeSideBar = () => {
    setShowSideBar(false);
    setOverlayDisplay("none");
  };
  const toggleSideBar = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowSideBar(true);
    setOverlayDisplay("block");
  };

  return (
    <Container fluid={true} className={showSideBar ? "no-scroll" : null}>

        <SideBar
            hidden={showSideBar?'sidebar visible':'sidebar hidden'}
          profession={location.pathname.split("/")[1]}
          userName={userName}
          profileImage={profileImage}
          closeSideBar={closeSideBar}
        />


            <Row>
                <Col>

                    <Navbar>
                        <Button onClick={toggleSideBar} className={'sidebar-toggle-button'}>
                            <span className="navbar-toggler-icon">{""}</span> </Button>
                        <Navbar.Brand href="/">
                            Batch
                        </Navbar.Brand>
                        <Navbar.Collapse className={'justify-content-end'}>
                            <Navbar.Text>
                                <i className="fa fa-bell mr-2" />
                            </Navbar.Text>
                            <Link to={'/' + location.pathname.split('/')[1] + '/about'}>

                            <Navbar.Text
                                className={'profile-name'}> {userName || localStorage.getItem('name') !=='null'? localStorage.getItem('name'):'Set Profile Details' || 'Loading...'} </Navbar.Text>
                            <img
                                src={profileImage || localStorage.getItem('profileImage') !=='null'? localStorage.getItem('profileImage'):'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png'}
                                alt="" className={'profile-image'}/>
                            </Link>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
            <div className={'overlay'} style={{display: overlayDisplay}}>

            </div>
            <main>
            {children}

            </main>



        </Container>
    );
};

export default Layout;
