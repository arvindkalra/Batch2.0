import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {authneticateUser, connectToWeb3} from "../../dbController/init";

const Login = ({setDashboards, setUser}) => {
    const roles = ['farmer', 'manufacturer', 'laboratory', 'distributor', 'retailer', 'transporter'];
    const [pvtKey, setPvtKey] = useState('');

    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();


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
                setDashboards(dashBoardList)
                setUser()
            })

        })

    };


    return (
        <main>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Private Key
                            </Form.Label>
                            <Form.Control type={'text'} placeholder={'Enter Your Private Key'} onChange={e => {
                                setPvtKey(e.target.value)
                            }}/>


                        </Form.Group>
                        <Button type={'submit'} onClick={handleClick}>Login </Button>
                    </Form>
                </Col>
            </Row>
        </main>
    );
};

export default Login;
