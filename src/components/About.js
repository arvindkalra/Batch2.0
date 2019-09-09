import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { setBreadcrumb } from "../helpers";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProfileCard from "./ProfileCard";
import { connectToMetamask } from "../dbController/init";
import Loader from "./Loader";

const About = props => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    connectToMetamask();
  });

  return (
    <>
      <Layout location={props.location} history={props.history}>
        <Row>
          <Col>{setBreadcrumb(props.location.pathname)}</Col>
        </Row>

        <Row>
          <Col md={12}>
            <ProfileCard
              role={props.location.pathname.split("/")[1]}
              history={props.history}
              stopLoading={() => setLoading(false)}
            />
          </Col>
        </Row>
      </Layout>
      {loading ? <Loader message={"Fetching Details"} /> : null}
    </>
  );
};

export default About;
