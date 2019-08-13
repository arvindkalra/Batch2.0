import React from 'react';
import Layout from "../Layout";
import DistDashboard from "./DistDashboard";

const Distributor = ({location}) => {
    return (
        <Layout>
            <DistDashboard location={location} />

        </Layout>
    );
};

export default Distributor;
