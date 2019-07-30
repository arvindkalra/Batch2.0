import React from 'react';
import '../assets/stylesheets/sidebar.scss'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
const SideBar = ({closeSideBar}) => {
    return (
        <Container>
        <div className={'sidebar'}>
            <header>
            <button type="button" className="close-sidebar" aria-label="Close" onClick={()=>{closeSideBar()}}>
                <span aria-hidden="true">&times;</span>
            </button>
                <h1 className={'title'}> BATCH</h1>
            </header>
            <section className={'sidebar-profile-section'}>
                <Row>
                    <Col md={5}>
                        <img src="https://picsum.photos/id/1074/100" alt="" className={'profile-image'}/>
                    </Col>
                    <Col md={7} className={'sidebar-profile-details'}>
                        <span className={'name'}> Peter Williams</span> <br/>
                        <span>Farmer</span>
                    </Col>
                </Row>

            </section>

                    <ul className={'sidebar-list'}>
                        <li>
                            <i className="fas fa-tachometer-alt"></i>
                            DASHBOARD
                        </li>
                        <li>
                            <i className="fas fa-list"></i>
                            PRODUCT LIST
                        </li>
                        <li>
                            <i className="fas fa-chart-line"></i>
                            Reports and Summaries
                        </li>
                        <li>
                            <i className="fas fa-sign-out-alt"></i>
                            SIGN OUT
                        </li>
                    </ul>


        <section className={'sidebar-footer-section'}>
            <ul>
                <li>
                    <i className="fas fa-bell"></i>
                </li>
                <li>
                    <i className="fas fa-envelope"></i>
                </li>
                <li>
                    <i className="fas fa-cog"></i>
                </li>
            </ul>
        </section>
        </div>
        </Container>
    );
};

export default SideBar;
