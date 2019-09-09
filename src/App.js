import React, {useState, useEffect} from 'react';
import './assets/stylesheets/App.scss';
import Container from "react-bootstrap/es/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import {authneticateUser, connectToMetamask} from "./dbController/init";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/landingPage/Login";


function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [dashboardList, setDashboardList] = useState([]);
    const roles = ['farmer', 'manufacturer', 'laboratory', 'distributor', 'retailer', 'transporter'];

    const setDashboards = () => {
        connectToMetamask().then((res) => {

            return new Promise((resolve, reject) => {
                let accessibleDashboards = [];
                let count = 0;
                roles.forEach(role => {
                    authneticateUser(role).then(bool => {

                        if (bool) {
                            accessibleDashboards.push(role)
                        }
                        count++;
                        if (count === 6) {
                            resolve(accessibleDashboards)
                        }
                    })
                });

            }).then(dbList => {
                if (dbList.length > 0) {

                    setDashboardList(dbList);
                    setLoggedIn(true)
                } else {
                    alert("This account is not registered");
                    sessionStorage.setItem('pkey', '');
                    window.location.reload()

                }
            })

        })


    };
    useEffect(() => {
        const pkey = JSON.parse(sessionStorage.getItem('pkey'));
        if (pkey) {
            setDashboards()
        }
    }, []);


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

                {!loggedIn ? <Login setDashboards={setDashboards} /> : <LandingPage dashboards={dashboardList}/>}

            </Container>
        </>
    );
}

export default App;
