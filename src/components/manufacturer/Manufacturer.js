import React from 'react';
import Layout from "../Layout";
import ManufacturerDashboard from "./ManufacturerDashboard";
import "../manufacturer.scss";

const Manufacturer = ({location}) => {
    return (
        <Layout>
            <ManufacturerDashboard location={location}/>
        </Layout>
    );
};

export default Manufacturer;
