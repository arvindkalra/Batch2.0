import React from 'react';
import Layout from "../Layout";
import TransporterDashboard from "./TransporterDashboard";
import "../transporter.scss";

const Transporter = ({location}) => {
    return (
        <Layout>
            <TransporterDashboard location={location}/>
        </Layout>
    );
};

export default Transporter;
