import React,{useState} from 'react';
import './assets/stylesheets/App.scss';
import Container from "react-bootstrap/es/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import {authneticateUser, connectToMetamask} from "./dbController/init";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/landingPage/Login";

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [dashboardList, setDashboardList] = useState([])

    const handleSelect = e => {
        const currentVal = e.target.value;


        connectToMetamask().then(() => {


            authneticateUser(currentVal).then(bool => {


                if (bool) {
                    if (currentVal === 'farmer') {
                        window.open('/' + 'cultivator' + '/dashboard', '_blank');
                    } else {

                        window.open('/' + currentVal + '/dashboard', '_blank');
                    }
                } else {
                    alert('you are not authorized to visit this page. Please contact the application admin for further details')
                }
            })
        })


    };


    return (<>
            <Jumbotron fluid>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h1>
                                Welcome To Batch
                            </h1>
                            <h4>
                                Alpha V1.0
                            </h4>
                        </Col>
                    </Row>

                </Container>
            </Jumbotron>
            <Container fluid={true}>

                {/*<section className={'login-section'}>*/}

                {/*    <Row>*/}

                {/*        <Col md={{span: 6, offset: 3}}>*/}
                {/*            <Form.Group>*/}
                {/*                <p className={'description'}>*/}
                {/*                    You are a*/}
                {/*                </p>*/}
                {/*                <Form.Control as={'select'} onChange={handleSelect}>*/}
                {/*                    <option value="">Select your role</option>*/}
                {/*                    <option value="farmer">Cultivator</option>*/}
                {/*                    <option value="laboratory">Laboratory</option>*/}
                {/*                    <option value="manufacturer">Manufacturer</option>*/}
                {/*                    <option value="transporter">Transporter</option>*/}
                {/*                    <option value="distributor">Distributor</option>*/}
                {/*                    <option value="retailer">Retailer</option>*/}
                {/*                </Form.Control>*/}
                {/*            </Form.Group>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</section>*/}


                {!loggedIn?<Login setDashboards={(dashboardList)=>{setDashboardList(dashboardList)}} setUser={()=>{setLoggedIn(true)}} />:<LandingPage dashboards={dashboardList}/>}

            </Container>
        </>
    );
}

export default App;
