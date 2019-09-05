import React from 'react';
import {Col} from "react-bootstrap";
import {Link} from "react-router-dom";

const AdminTab = ({role}) => {
    return (
        <Col md={4}>

            <section className={'card'}>
                <div className={"card-header"}>
                    <div className={"utils__title"}>
                        <strong>{role}</strong>
                    </div>
                </div>
                <div className={'card-footer'}>
                    {role ==='farmer'?<Link target={'_blank'} to={'/cultivator/dashboard'}>View Dashboard ></Link>:<Link target={'_blank'} to={`/${role}/dashboard`}>View Dashboard ></Link>}




                </div>
            </section>

        </Col>
    );
};

export default AdminTab;
