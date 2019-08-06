import React from 'react';
import Layout from "../Layout";
import RetailerDashboard from "./RetailerDashboard";

const Retailer = ({location}) => {
    return (

        <Layout>
            <RetailerDashboard location={location}/>
        </Layout>

    );
};

export default Retailer;
