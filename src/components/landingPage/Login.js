import React, {useState} from 'react';
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import {authneticateUser, connectToWeb3} from "../../dbController/init";
import Loader from "../Loader";

const Login = ({setDashboards, setUser}) => {
    const roles = ['farmer', 'manufacturer', 'laboratory', 'distributor', 'retailer', 'transporter'];
    const [pvtKey, setPvtKey] = useState('');
    const [clicked, setClicked] = useState(false);
    const [pvtKeyIsValid, setPvtKeyIsValid] = useState(false);
    const [preloader, setPreloader] = useState(false);


    const handleClick = e => {

        e.preventDefault();
        e.stopPropagation();
        setClicked(true);
        if (pvtKey.length === 66) {
            setPvtKeyIsValid(true)
            setPreloader(true);

            connectToWeb3(pvtKey).then((res) => {
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

                }).then(dashBoardList => {
                    if (dashBoardList.length > 0) {

                        setDashboards(dashBoardList);
                        setUser()
                    } else {
                        alert("This account is not registered");
                        sessionStorage.setItem('pkey','');
                        window.location.reload()

                    }
                })

            })

        } else {
            console.log("inside else");
            setPvtKeyIsValid(false)
        }

    };


    return (
        <main className={'landing-page'}>
            <Row>
                <Col md={{span: 6, offset: 3}} xs={{span: 8, offset: 2}}>
                    <Form className={'login-form card'}>
                        <h1>Login</h1>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId={'login-pvt-key'}>
                                    <Form.Label>
                                        Private Key
                                    </Form.Label>
                                    <Form.Control
                                        type={'text'}
                                        placeholder={'Enter Your Private Key'} onChange={e => {
                                        setPvtKey(e.target.value)

                                    }}
                                        isInvalid={clicked ? !pvtKeyIsValid : false}
                                    />
                                    <FormControl.Feedback type={"invalid"}>
                                        <strong>Required</strong> Enter a Valid Private Key
                                    </FormControl.Feedback>
                                </Form.Group>

                                <p>
                                    Based on your private key, you will be able to see the dashboards you can access
                                </p>
                            </Col>
                            <Col md={12}>
                                <Button type={'submit'} onClick={handleClick}>Login </Button>
                            </Col>
                        </Row>
                    </Form>

                </Col>
            </Row>
            {preloader ? <Loader message={"Loading Dashboard"}/> : null}
        </main>
    );
};

export default Login;
