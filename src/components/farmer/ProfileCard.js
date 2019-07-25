import React from 'react';
import Row from 'react-bootstrap/Row';
import Col   from 'react-bootstrap/Col';
const ProfileCard = () => {
    return (
        <section className={'profile-section'}>
            <Row>
                <Col md={4}>
                    <section className={'profile-section-image'}>
                        <img src="https://picsum.photos/id/1074/480" alt="" className={'profile-image'}/>
                    </section>
                </Col>
                <Col md={4}>
                    <section className={'profile-section-details'}>
                        <ul>
                            <li>Name: <span> Peter Williams </span> </li>
                            <li>Company Name: <span> SkyView  </span> </li>
                            <li>Farm Address: <span> 50 Frees Street, San Francisco CA 94105</span> </li>
                            <li>Farm License <span> #112345 </span> <span>Download License</span> </li>
                        </ul>
                    </section>
                </Col>
            </Row>
        </section>
    );
};

export default ProfileCard;
